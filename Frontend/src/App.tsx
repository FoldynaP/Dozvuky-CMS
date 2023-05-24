import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

//PAGES
import Homepage from './pages/Homepage';
import Kapely from './pages/Kapely';
import KapelyDetail from './pages/KapelyDetail';
import NovinkyDetail from './pages/NovinkyDetail';
import Gallery from './pages/Gallery';
import GalleryDetail from './pages/GalleryDetail';

//layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const url = process.env.REACT_APP_STRAPI_API_URL;
//apollo client
const client = new ApolloClient({
  uri: url + "/graphql",
  cache: new InMemoryCache(),
})

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      const mainElement = document.querySelector('main');

      if (mainElement) {
        if (pathname === '/') {
          // Smooth scroll behavior for anchors on the homepage
          const anchors = mainElement.querySelectorAll('a');
          anchors.forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
              const targetId = anchor.getAttribute('href')?.substring(1);
              const targetElement = targetId ? document.getElementById(targetId) : null;
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
              }
            });
          });
        } else {
          // Auto scroll behavior for non-homepage routes
          mainElement.scrollIntoView({ behavior: 'auto' });
        }
      }
    };

    scrollToTop();
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/kapely" element={<Kapely />} />
              <Route path="/kapely/:id" element={<KapelyDetail />} />
              <Route path="/galerie" element={<Gallery />} />
              <Route path="/galerie/:id" element={<GalleryDetail />} />
              <Route path="/novinky/:id" element={<NovinkyDetail />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;