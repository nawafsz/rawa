import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Bookmark, Save } from 'lucide-react';

interface Surah {
  number: number;
  name: string;
  englishName: string;
}

const Quran = () => {
  const { t, i18n } = useTranslation();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => setSurahs(data.data))
      .catch(err => console.error("Failed to fetch surahs", err));
  }, []);

  const handleSurahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const surah = surahs.find(s => s.number === parseInt(e.target.value));
    if (surah) {
        setSelectedSurah(surah);
    }
  };

  const saveBookmark = () => {
    if (audioRef.current && selectedSurah) {
      const bookmark = {
        surah: selectedSurah,
        time: audioRef.current.currentTime
      };
      localStorage.setItem('quran_bookmark', JSON.stringify(bookmark));
      alert(t('save_bookmark') + ' Success');
    }
  };

  const loadBookmark = () => {
    const saved = localStorage.getItem('quran_bookmark');
    if (saved) {
      const bookmark = JSON.parse(saved);
      setSelectedSurah(bookmark.surah);
      // Wait for audio src to update then seek
      setTimeout(() => {
          if (audioRef.current) {
              audioRef.current.currentTime = bookmark.time;
              audioRef.current.play();
          }
      }, 500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-4">
      <h2 className="text-3xl font-bold font-amiri text-center text-primary-800">{t('quran')}</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-lg border border-primary-100 space-y-6">
        <div className="form-control space-y-2">
            <label className="label">
                <span className="label-text text-lg font-bold text-primary-700">{t('select_surah')}</span>
            </label>
            <select 
                className="w-full p-3 rounded-lg border border-primary-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white text-gray-800 outline-none"
                onChange={handleSurahChange}
                value={selectedSurah?.number || ''}
            >
                <option value="" disabled>{t('select_surah')}</option>
                {surahs.map((surah) => (
                    <option key={surah.number} value={surah.number}>
                        {surah.number}. {i18n.language === 'ar' ? surah.name : surah.englishName}
                    </option>
                ))}
            </select>
        </div>

        {selectedSurah && (
            <div className="text-center space-y-6 animate-in fade-in duration-500">
                <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
                    <h3 className="text-3xl font-amiri font-bold text-primary-800 mb-2">{selectedSurah.name}</h3>
                    <p className="text-primary-600">{selectedSurah.englishName}</p>
                </div>

                <audio
                    ref={audioRef}
                    src={`https://server8.mp3quran.net/afs/${String(selectedSurah.number).padStart(3, '0')}.mp3`}
                    controls
                    className="w-full"
                />

                <div className="flex justify-center gap-4">
                    <button 
                        onClick={saveBookmark}
                        className="bg-primary-600 text-white hover:bg-primary-700 px-6 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                    >
                        <Save size={20} />
                        {t('save_bookmark')}
                    </button>
                </div>
            </div>
        )}

        <div className="border-t border-gray-200 my-4 pt-4">
            <button 
                onClick={loadBookmark}
                className="w-full bg-secondary-500 text-white hover:bg-secondary-600 px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-colors shadow-md"
            >
                <Bookmark size={20} />
                {t('resume')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Quran;
