/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Segmentation from './pages/Segmentation';
import Recommendations from './pages/Recommendations';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col selection:bg-lokal-green selection:text-lokal-black">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/segmentation" element={<Segmentation />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

