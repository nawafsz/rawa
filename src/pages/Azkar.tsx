import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Star } from 'lucide-react';
import { clsx } from 'clsx';

const Azkar = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'morning' | 'evening' | 'post'>('morning');

  const tabs = [
    { id: 'morning', label: 'morning_azkar', icon: Sun },
    { id: 'evening', label: 'evening_azkar', icon: Moon },
    { id: 'post', label: 'post_prayer_azkar', icon: Star },
  ];

  // Placeholder data - in real app would be larger
  const azkarData = {
    morning: [
      { text: "اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا ، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ النُّـشُور.", count: 1 },
      { text: "أَصْبَحْنا وَأَصْبَحَ المُلْكُ لله وَالحَمدُ لله، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُلْكُ ولهُ الحَمْد، وهُوَ على كلّ شَيءٍ قدير.", count: 1 },
      { text: "سُبْحـانَ اللهِ وَبِحَمْـدِهِ.", count: 100 },
      { text: "اللّهُـمَّ إِنِّـي أَسْـأَلُـكَ عِلْمـاً نافِعـاً ، وَرِزْقـاً طَيِّـباً ، وَعَمَـلاً مُتَقَبَّـلاً.", count: 1 },
    ],
    evening: [
      { text: "اللّهُـمَّ بِكَ أَمْسَـينا وَبِكَ أَصْـبَحْنا، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ الْمَصِير.", count: 1 },
      { text: "أَمْسَيْـنا وَأَمْسـى المـلكُ لله وَالحَمدُ لله، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ.", count: 1 },
      { text: "أَعـوذُ بِكَلِمـاتِ اللّهِ التّـامّـاتِ مِنْ شَـرِّ ما خَلَـق.", count: 3 },
    ],
    post: [
        { text: "أَسْتَغْفِرُ اللهَ (ثَلاثاً).", count: 3 },
        { text: "اللّهُمَّ أَنْـتَ السَّلامُ ، وَمِـنْكَ السَّلام ، تَبارَكْتَ يا ذا الجَـلالِ وَالإِكْـرام.", count: 1 },
        { text: "لا إلهَ إلاّ اللّهُ وحدَهُ لا شريكَ لهُ، لهُ المُـلْكُ ولهُ الحَمْد، وهُوَ على كلّ شَيءٍ قَدير.", count: 10 },
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
       <h2 className="text-3xl font-bold font-amiri text-center text-primary-800">{t('azkar')}</h2>
       
       <div className="flex justify-center gap-4">
         {tabs.map((tab) => {
           const Icon = tab.icon;
           return (
             <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={clsx(
                    "flex flex-col items-center gap-2 p-4 rounded-xl transition-all w-24 sm:w-32",
                    activeTab === tab.id
                        ? "bg-primary-600 text-white shadow-lg scale-105"
                        : "bg-white text-gray-600 hover:bg-primary-50"
                )}
             >
                <Icon size={24} />
                <span className="text-sm font-bold text-center">{t(tab.label)}</span>
             </button>
           );
         })}
       </div>

       <div className="space-y-4">
         {azkarData[activeTab].map((zekr, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border-r-4 border-primary-500 hover:shadow-lg transition-shadow">
                <p className="text-xl font-amiri leading-loose text-gray-800 text-center mb-4">
                    {zekr.text}
                </p>
                <div className="flex justify-center">
                    <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-bold">
                        {zekr.count} {i18n.language === 'ar' ? 'مرات' : 'Times'}
                    </span>
                </div>
            </div>
         ))}
       </div>
    </div>
  );
};

export default Azkar;
