import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Book } from 'lucide-react';

interface Surah {
  number: number;
  name: string;
  englishName: string;
}

const Tafsir = () => {
  const { t, i18n } = useTranslation();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [tafsirText, setTafsirText] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => setSurahs(data.data));
  }, []);

  const fetchTafsir = (surah: Surah) => {
    setLoading(true);
    // Using a mock text for demo as real Tafsir API requires complex integration
    setTimeout(() => {
        setTafsirText(i18n.language === 'ar' 
            ? `تفسير سورة ${surah.name} \n\n(التفسير الميسر)\n\nهذا نموذج لتفسير السورة. يمكنك إضافة محتوى التفسير هنا أو ربطه بواجهة برمجة تطبيقات خارجية.\n\nبسم الله الرحمن الرحيم...`
            : `Tafsir of ${surah.englishName} \n\n(Al-Jalalayn)\n\nThis is a placeholder for the Tafsir text. In a production app, you would fetch this from a Tafsir API.\n\nIn the name of Allah...`);
        setLoading(false);
    }, 800);
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
                        <span className="text-gray-500">Thinking...</span>
                    </div>
                ) : (
                    <div className="prose max-w-none font-amiri text-xl leading-loose text-gray-700 whitespace-pre-line bg-primary-50 p-6 rounded-lg border border-primary-100">
                        {tafsirText}
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
