import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//PAGES
import Homepage from './pages/Homepage';
import Kapely from './pages/Kapely';
import KapelyDetail from './pages/KapelyDetail';
import Novinky from './pages/Novinky';

//layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';


function App() {
  return (
    <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/kapely" element={<Kapely />} />
              <Route path="/kapely/:id" element={<KapelyDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  );
}

export default App;