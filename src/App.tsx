import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Quran from './pages/Quran';
import PrayerTimes from './pages/PrayerTimes';
import Qibla from './pages/Qibla';
import Azkar from './pages/Azkar';
import Tafsir from './pages/Tafsir';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quran" element={<Quran />} />
          <Route path="/tafsir" element={<Tafsir />} />
          <Route path="/prayer-times" element={<PrayerTimes />} />
          <Route path="/qibla" element={<Qibla />} />
          <Route path="/azkar" element={<Azkar />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
