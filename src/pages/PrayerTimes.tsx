import { useEffect, useState } from 'react';
import { Coordinates, CalculationMethod, PrayerTimes as AdhanPrayerTimes, Madhab } from 'adhan';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { MapPin, Calendar, Clock } from 'lucide-react';

const PrayerTimes = () => {
  const { t } = useTranslation();
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<AdhanPrayerTimes | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords(new Coordinates(position.coords.latitude, position.coords.longitude));
        },
        () => {
          setError(t('location_permission'));
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [t]);

  useEffect(() => {
    if (coords) {
      const date = new Date();
      // Use Muslim World League as default, but maybe customizable later
      const params = CalculationMethod.MuslimWorldLeague();
      params.madhab = Madhab.Shafi;
      const times = new AdhanPrayerTimes(coords, date, params);
      setPrayerTimes(times);
    }
  }, [coords]);

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
            <MapPin size={48} className="text-red-500 mb-4" />
            <p className="text-xl text-gray-700">{error}</p>
        </div>
    );
  }

  if (!prayerTimes) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading prayer times...</p>
        </div>
    );
  }

  const times = [
    { name: 'fajr', time: prayerTimes.fajr },
    { name: 'sunrise', time: prayerTimes.sunrise },
    { name: 'dhuhr', time: prayerTimes.dhuhr },
    { name: 'asr', time: prayerTimes.asr },
    { name: 'maghrib', time: prayerTimes.maghrib },
    { name: 'isha', time: prayerTimes.isha },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-primary-100">
        <div className="bg-primary-600 p-6 text-white text-center">
            <h2 className="text-3xl font-bold font-amiri mb-2">{t('prayer_times')}</h2>
            <div className="flex justify-center items-center gap-2 text-primary-100">
                <Calendar size={18} />
                <span>{format(new Date(), 'EEEE, d MMMM yyyy')}</span>
            </div>
        </div>
        
        <div className="divide-y divide-gray-100">
            {times.map((item) => (
                <div key={item.name} className="flex justify-between items-center p-6 hover:bg-primary-50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary-100 p-2 rounded-lg text-primary-600">
                            <Clock size={24} />
                        </div>
                        <span className="text-xl font-bold text-gray-800">{t(item.name)}</span>
                    </div>
                    <span className="text-2xl font-mono text-primary-700 font-bold">
                        {format(item.time, 'h:mm a')}
                    </span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
