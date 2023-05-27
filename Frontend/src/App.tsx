import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Helmet } from 'react-helmet';
import useFetch from './hooks/UseFetch';

//PAGES
import Homepage from './pages/Homepage';
import Kapely from './pages/Kapely';
import KapelyDetail from './pages/KapelyDetail';
import NovinkyDetail from './pages/NovinkyDetail';
import Gallery from './pages/Gallery';
import GalleryDetail from './pages/GalleryDetail';

//Components
import CountDown from './components/CountDown';

//layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

interface countdownTypes {
  id: number,
  Message: string,
  Date: Date,
  After: string
}


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
  let targetDate: number | undefined;
  const url = process.env.REACT_APP_STRAPI_API_URL;
  const { loading, error, data } = useFetch<countdownTypes>(url + "/api/countdown" + "?populate=*");
  const date = data?.Date;

  if (date) {
    const targetTime = new Date(date).getTime();
    const now = new Date().getTime();
    targetDate = now + (targetTime - now);
  }
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <Helmet>
            <title>Dozvuky léta</title>
            <meta name="description" content="Festival dozvuky léta je Českotřebovský festival, založený skupinou mladých lidí, jejichž cílem je oživit naše město. Festival se koná letos již po třetí a každým rokem se posouvá dál. Navštivte stránky pro více informací ohledně programu." />
          </Helmet>
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
          {data?.Date && 
            <CountDown targetDate={targetDate} message={data?.Message}/>
          }
          <ScrollToTop />
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;