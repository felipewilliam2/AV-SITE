import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import Terms from './pages/Terms';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Rota Principal (Home) - Garante renderização inicial */}
            <Route path="/" element={<Home />} />

            {/* Rotas do Blog */}
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/termos-de-uso" element={<Terms />} />

            {/* Rota de Fallback (Catch-all): Redireciona qualquer URL inválida/desconhecida para a Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <AIChat />
      </div>
    </Router>
  );
}

export default App;