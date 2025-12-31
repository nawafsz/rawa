import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'ar',
    lng: 'ar', // Default to Arabic
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          "app_name": "Rawa",
          "home": "Home",
          "quran": "Holy Quran",
          "prayer_times": "Prayer Times",
          "qibla": "Qibla Compass",
          "azkar": "Azkar & Dua",
          "settings": "Settings",
          "select_surah": "Select Surah",
          "save_bookmark": "Save Bookmark",
          "resume": "Resume Recitation",
          "tafsir": "Tafsir",
          "fajr": "Fajr",
          "sunrise": "Sunrise",
          "dhuhr": "Dhuhr",
          "asr": "Asr",
          "maghrib": "Maghrib",
          "isha": "Isha",
          "change_language": "Change Language",
          "english": "English",
          "arabic": "Arabic",
          "location_permission": "Please enable location access to calculate prayer times and Qibla direction.",
          "qibla_instruction": "Align the arrow with the Kaaba icon.",
          "morning_azkar": "Morning Azkar",
          "evening_azkar": "Evening Azkar",
          "post_prayer_azkar": "Post Prayer Azkar"
        }
      },
      ar: {
        translation: {
          "app_name": "رواء",
          "home": "الرئيسية",
          "quran": "القرآن الكريم",
          "prayer_times": "مواقيت الصلاة",
          "qibla": "اتجاه القبلة",
          "azkar": "الأذكار والأدعية",
          "settings": "الإعدادات",
          "select_surah": "اختر السورة",
          "save_bookmark": "حفظ الموضع",
          "resume": "استئناف التلاوة",
          "tafsir": "التفسير",
          "fajr": "الفجر",
          "sunrise": "الشروق",
          "dhuhr": "الظهر",
          "asr": "العصر",
          "maghrib": "المغرب",
          "isha": "العشاء",
          "change_language": "تغيير اللغة",
          "english": "الإنجليزية",
          "arabic": "العربية",
          "location_permission": "يرجى تفعيل خدمة الموقع لحساب مواقيت الصلاة واتجاه القبلة.",
          "qibla_instruction": "قم بمحاذاة السهم مع أيقونة الكعبة.",
          "morning_azkar": "أذكار الصباح",
          "evening_azkar": "أذكار المساء",
          "post_prayer_azkar": "أذكار بعد الصلاة"
        }
      }
    }
  });

export default i18n;
