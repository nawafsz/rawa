import { useEffect, useState } from 'react';
import { Coordinates, Qibla as AdhanQibla } from 'adhan';
import { useTranslation } from 'react-i18next';

const QiblaPage = () => {
  const { t } = useTranslation();
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = new Coordinates(position.coords.latitude, position.coords.longitude);
          setQiblaAngle(AdhanQibla(coordinates));
        },
        () => setError(t('location_permission'))
      );
    } else {
      setError("Geolocation not supported");
    }
  }, [t]);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent | any) => {
      let compass = event.webkitCompassHeading;
      if (!compass && event.alpha) {
        compass = Math.abs(event.alpha - 360);
      }
      setHeading(compass || 0);
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!qiblaAngle) return <div className="text-center p-10">Loading Qibla Data...</div>;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-10">
      <h2 className="text-3xl font-bold font-amiri text-primary-800">{t('qibla')}</h2>
      <p className="text-gray-600">{t('qibla_instruction')}</p>
      
      <div className="relative w-72 h-72">
        {/* Compass Rose */}
        <div 
            className="absolute inset-0 border-4 border-primary-200 rounded-full bg-white shadow-2xl transition-transform duration-500 ease-out flex items-center justify-center"
            style={{ transform: `rotate(${-heading}deg)` }}
        >
            <div className="absolute top-2 text-gray-400 font-bold">N</div>
            <div className="absolute bottom-2 text-gray-400 font-bold">S</div>
            <div className="absolute left-2 text-gray-400 font-bold">W</div>
            <div className="absolute right-2 text-gray-400 font-bold">E</div>
            
            {/* Kaaba Indicator */}
            <div 
                className="absolute w-1 h-1/2 origin-bottom flex justify-center pt-2"
                style={{ transform: `rotate(${qiblaAngle}deg)` }}
            >
                 <div className="text-4xl transform -translate-y-1">🕋</div>
            </div>
        </div>

        {/* Fixed Arrow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-0.5 h-16 bg-red-500 -mt-16 relative">
                <div className="absolute -top-2 -left-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] border-b-red-500"></div>
            </div>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-xl font-bold text-primary-800">
            {t('qibla')}: {qiblaAngle.toFixed(2)}°
        </p>
        <p className="text-gray-500 text-sm">
            Current Heading: {heading ? heading.toFixed(0) : 0}°
        </p>
      </div>
    </div>
  );
};

export default QiblaPage;
