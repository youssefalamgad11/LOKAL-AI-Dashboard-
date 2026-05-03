import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import { kmeans } from "ml-kmeans";
import { parse } from "papaparse";

const app = express();
const PORT = 3000;

// Setup Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());

// API: Customer Segmentation
app.post("/api/segment", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const csvData = req.file.buffer.toString("utf-8");
    const parsed = parse(csvData, { header: true, dynamicTyping: true });
    const data = parsed.data as any[];

    const REQUIRED_COLS = [
      "avg_order_value",
      "purchase_frequency",
      "days_since_last_purchase",
      "discount_usage_rate",
      "product_views_per_visit",
    ];

    // Filter valid rows
    const validData = data.filter((row: any) => 
      REQUIRED_COLS.every(col => row[col] !== undefined && row[col] !== null)
    );

    if (validData.length < 4) {
      return res.status(400).json({ error: "Insufficient valid data (at least 4 customers required)" });
    }

    // Feature extraction & simple scaling
    const featureMatrix = validData.map(row => {
      // Manual scaling: simplistic min-max behavior or normalization
      // Engagement score logic from original prompt
      const engagementScore = (row.purchase_frequency * 2) + row.product_views_per_visit - (row.days_since_last_purchase * 0.05);
      
      return [
        row.avg_order_value || 0,
        row.purchase_frequency || 0,
        row.days_since_last_purchase || 0,
        row.discount_usage_rate || 0,
        engagementScore
      ];
    });

    // Run KMeans
    const ans = kmeans(featureMatrix, 4, { seed: 42 });

    const SEGMENT_MAP: Record<number, string> = {
      0: "VIP Customers",
      1: "Discount Hunters",
      2: "At Risk Customers",
      3: "Window Shoppers",
    };

    const results = validData.map((row, i) => ({
      ...row,
      segment: SEGMENT_MAP[ans.clusters[i]]
    }));

    const segmentsCount = [0, 1, 2, 3].map(clusterId => {
      const name = SEGMENT_MAP[clusterId];
      const count = ans.clusters.filter(c => c === clusterId).length;
      return {
        segment: name,
        count: count,
        percentage: parseFloat(((count / validData.length) * 100).toFixed(1))
      };
    });

    res.json({
      total_customers: validData.length,
      segments: segmentsCount,
      cluster_centers: ans.centroids
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Segmentation failed" });
  }
});

// API: Recommendations
const PRODUCTS: Record<string, any[]> = {
  "VIP Customers": [
    { product: "Premium Linen Blazer", category: "Outerwear", price: 2800, score: 0.97 },
    { product: "Handcrafted Leather Belt", category: "Accessories", price: 950, score: 0.94 },
    { product: "Silk Kaftan — Limited Edition", category: "Dresses", price: 3500, score: 0.91 },
    { product: "Egyptian Cotton Trousers", category: "Bottoms", price: 1800, score: 0.89 },
    { product: "Artisan Tote Bag", category: "Bags", price: 2200, score: 0.87 },
  ],
  "Discount Hunters": [
    { product: "Classic Tee 3-Pack Bundle", category: "Tops", price: 399, score: 0.96 },
    { product: "Denim Shorts — Flash Sale", category: "Bottoms", price: 299, score: 0.93 },
    { product: "Summer Dress Bundle", category: "Dresses", price: 549, score: 0.90 },
    { product: "Printed Scarf Set", category: "Accessories", price: 199, score: 0.88 },
    { product: "Basics Pack (5 items)", category: "Tops", price: 699, score: 0.85 },
  ],
  "At Risk Customers": [
    { product: "We Miss You — Mystery Box", category: "Bundles", price: 799, score: 0.95 },
    { product: "Bestseller Restock — Linen Top", category: "Tops", price: 680, score: 0.92 },
    { product: "Fan Favorite Maxi Dress", category: "Dresses", price: 1100, score: 0.89 },
    { product: "New Season Opener Pack", category: "Bundles", price: 999, score: 0.86 },
    { product: "Comfort Jogger Set", category: "Sets", price: 750, score: 0.83 },
  ],
  "Window Shoppers": [
    { product: "Starter Tee — First Purchase", category: "Tops", price: 249, score: 0.94 },
    { product: "Trending Cargo Pants", category: "Bottoms", price: 890, score: 0.91 },
    { product: "Influencer Pick — Slip Dress", category: "Dresses", price: 750, score: 0.88 },
    { product: "Welcome Gift Set", category: "Bundles", price: 499, score: 0.85 },
    { product: "Viral Cap — As Seen on Instagram", category: "Accessories", price: 320, score: 0.82 },
  ],
};

app.post("/api/recommend", (req, res) => {
  const { segment_name } = req.body;
  const recommendations = PRODUCTS[segment_name] || [];
  res.json({
    segment: segment_name,
    recommendations: recommendations
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
