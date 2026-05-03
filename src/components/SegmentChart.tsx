import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#BEFF04', '#FF6B35', '#FF3B3B', '#5BC8FF'];

interface SegmentChartProps {
  data: any[];
}

export default function SegmentChart({ data }: SegmentChartProps) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={data} 
            dataKey="count" 
            nameKey="segment" 
            cx="50%" 
            cy="50%"
            outerRadius={100} 
            innerRadius={60} 
            paddingAngle={5}
            stroke="none"
          >
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip
            contentStyle={{ 
              backgroundColor: '#111', 
              border: '1px solid #2A2A2A', 
              borderRadius: '8px', 
              color: '#F5F5F0',
              textTransform: 'uppercase',
              fontSize: '11px',
              letterSpacing: '0.05em'
            }}
            itemStyle={{ color: '#BEFF04' }}
            cursor={{ fill: 'transparent' }}
          />
          <Legend 
            verticalAlign="bottom" 
            align="center"
            wrapperStyle={{ 
              paddingTop: '20px',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#888'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
