import { useTranslation } from 'react-i18next';
import { BookOpen, Clock, Compass, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();

  const features = [
    { path: '/quran', label: 'quran', icon: BookOpen, desc: 'Listen and Read' },
    { path: '/prayer-times', label: 'prayer_times', icon: Clock, desc: 'Accurate Times' },
    { path: '/qibla', label: 'qibla', icon: Compass, desc: 'Find Direction' },
    { path: '/azkar', label: 'azkar', icon: Moon, desc: 'Daily Remembrance' },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-amiri font-bold text-primary-800">{t('app_name')}</h1>
        <p className="text-xl text-primary-600 font-amiri">"Indeed, in the remembrance of Allah do hearts find rest"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.path}
              to={feature.path}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-primary-100 flex flex-col items-center text-center group"
            >
              <div className="bg-primary-50 p-4 rounded-full mb-4 group-hover:bg-primary-100 transition-colors">
                <Icon size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t(feature.label)}</h3>
              {/* <p className="text-gray-500 text-sm">{feature.desc}</p> */}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
