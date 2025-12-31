import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Book, BookOpen } from 'lucide-react';

interface Surah {
  number: number;
  name: string;
  englishName: string;
}

interface AyahData {
  number: number;
  text: string;
  numberInSurah: number;
}

interface TafsirResponse {
  data: {
    ayahs: AyahData[];
    edition: {
      name: string;
      englishName: string;
    };
  }[];
}

const Tafsir = () => {
  const { t, i18n } = useTranslation();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<{ quran: AyahData; tafsir: AyahData }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => setSurahs(data.data));
  }, []);

  const fetchTafsir = async (surah: Surah) => {
    setLoading(true);
    setAyahs([]);
    
    // Fetch Quran text (Simple or Uthmani) and Tafsir (Al-Muyassar for Arabic, Saheeh for English as fallback)
    // Note: 'ar.muyassar' is the standard easy tafsir.
    // For English, we'll use 'en.sahih' (translation) as a placeholder for explanation if strictly 'tafsir' isn't available in simple format
    const tafsirEdition = i18n.language === 'ar' ? 'ar.muyassar' : 'en.sahih';
    const quranEdition = 'quran-uthmani';

    try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/editions/${quranEdition},${tafsirEdition}`);
        const data: TafsirResponse = await response.json();
        
        if (data.data && data.data.length >= 2) {
            const quranData = data.data[0].ayahs;
            const tafsirData = data.data[1].ayahs;
            
            const combined = quranData.map((ayah, index) => ({
                quran: ayah,
                tafsir: tafsirData[index]
            }));
            
            setAyahs(combined);
        }
    } catch (error) {
        console.error("Failed to fetch tafsir", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSurah) {
        fetchTafsir(selectedSurah);
    }
  }, [selectedSurah, i18n.language]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <h2 className="text-3xl font-bold font-amiri text-center text-primary-800">{t('tafsir')}</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-lg border border-primary-100 min-h-[500px]">
         <div className="form-control mb-8">
            <label className="label mb-2 block">
                <span className="label-text text-lg font-bold text-primary-700">{t('select_surah')}</span>
            </label>
            <select 
                className="w-full p-3 rounded-lg border border-primary-300 outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-800"
                onChange={(e) => {
                    const s = surahs.find(x => x.number === parseInt(e.target.value));
                    setSelectedSurah(s || null);
                }}
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

        {selectedSurah ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 text-primary-700 border-b pb-4 border-primary-100">
                    <Book size={28} />
                    <h3 className="text-3xl font-bold font-amiri">{selectedSurah.name}</h3>
                </div>
                
                {loading ? (
                    <div className="text-center py-20 flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                        <span className="text-gray-500">جاري تحميل التفسير...</span>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {ayahs.map((item, index) => (
                            <div key={index} className="bg-primary-50 p-6 rounded-xl border border-primary-100">
                                <div className="mb-4 text-center border-b border-primary-200 pb-4">
                                    <p className="font-amiri text-2xl leading-loose text-primary-900 mb-2">
                                        {item.quran.text} 
                                        <span className="inline-flex items-center justify-center w-8 h-8 mr-2 text-sm border border-primary-600 rounded-full text-primary-600 number-font">
                                            {item.quran.numberInSurah}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary-700 mb-2 flex items-center gap-2">
                                        <BookOpen size={16} />
                                        {i18n.language === 'ar' ? 'التفسير:' : 'Explanation:'}
                                    </h4>
                                    <p className="font-amiri text-lg leading-loose text-gray-700">
                                        {item.tafsir.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Book size={64} className="mb-4 opacity-50" />
                <p className="text-lg">{t('select_surah')}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Tafsir;
