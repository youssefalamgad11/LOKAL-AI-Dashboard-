/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Segmentation from './pages/Segmentation';
import Recommendations from './pages/Recommendations';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col selection:bg-lokal-green selection:text-lokal-black text-lokal-white font-sans">
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
    </HashRouter>
  );
}

