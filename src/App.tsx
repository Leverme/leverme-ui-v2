import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './components/Web3Provider';
import { Navigation } from './components/Navigation';
import { Footer } from './components/footer';
import { Home } from './pages/Home';
import { Trading } from './pages/Trading';
import { Liquidity } from './pages/Liquidity';
import { Lending } from './pages/Lending';
import { History } from './pages/History';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trading" element={<Trading />} />
            <Route path="/liquidity" element={<Liquidity />} />
            <Route path="/lending" element={<Lending />} />
            <Route path="/history" element={<History />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;
