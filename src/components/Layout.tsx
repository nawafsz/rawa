import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useTranslation } from 'react-i18next';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col font-cairo bg-islamic-pattern bg-opacity-5">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-primary-900 text-primary-100 py-6 text-center">
        <p className="font-amiri text-lg">{i18n.language === 'ar' ? 'رواء - نسيم الإيمان' : 'Rawa - Breeze of Faith'}</p>
      </footer>
    </div>
  );
};

export default Layout;
