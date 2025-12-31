import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, Moon, Compass, Clock, Menu, X, FileText } from 'lucide-react';
import { clsx } from 'clsx';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const navItems = [
    { path: '/', label: 'home', icon: BookOpen },
    { path: '/quran', label: 'quran', icon: BookOpen },
    { path: '/tafsir', label: 'tafsir', icon: FileText },
    { path: '/prayer-times', label: 'prayer_times', icon: Clock },
    { path: '/qibla', label: 'qibla', icon: Compass },
    { path: '/azkar', label: 'azkar', icon: Moon },
  ];

  return (
    <nav className="bg-primary-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold font-amiri text-primary-100">
              {t('app_name')}
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4 rtl:space-x-reverse">
              {navItems.map((item) => {
                 const Icon = item.icon;
                 return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors",
                      location.pathname === item.path
                        ? "bg-primary-700 text-white"
                        : "text-primary-100 hover:bg-primary-700"
                    )}
                  >
                    <Icon size={18} />
                    <span>{t(item.label)}</span>
                  </Link>
                );
              })}
              <button
                onClick={toggleLanguage}
                className="px-3 py-2 rounded-md text-sm font-medium text-primary-100 hover:bg-primary-700 transition-colors"
              >
                {t('change_language')}
              </button>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-primary-700 inline-flex items-center justify-center p-2 rounded-md text-primary-100 hover:text-white hover:bg-primary-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-primary-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2",
                    location.pathname === item.path
                      ? "bg-primary-700 text-white"
                      : "text-primary-100 hover:bg-primary-700"
                  )}
                >
                  <Icon size={18} />
                  <span>{t(item.label)}</span>
                </Link>
              );
            })}
             <button
                onClick={() => {
                    toggleLanguage();
                    setIsOpen(false);
                }}
                className="w-full text-right block px-3 py-2 rounded-md text-base font-medium text-primary-100 hover:bg-primary-700 rtl:text-left"
              >
                {t('change_language')}
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
