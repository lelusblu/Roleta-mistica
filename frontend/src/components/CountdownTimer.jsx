import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const CountdownTimer = ({ initialMinutes = 15, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire && onExpire();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isUrgent = timeLeft <= 300; // Últimos 5 minutos

  return (
    <div className={`
      flex items-center justify-center p-3 rounded-lg border transition-all duration-500
      ${isUrgent 
        ? 'bg-red-900/30 border-red-400/50 animate-pulse' 
        : 'bg-amber-900/30 border-amber-400/50'
      }
    `}>
      <div className="flex items-center space-x-2">
        {isUrgent ? (
          <AlertTriangle className="w-5 h-5 text-red-400" />
        ) : (
          <Clock className="w-5 h-5 text-amber-400" />
        )}
        <span className={`font-bold text-lg ${isUrgent ? 'text-red-400' : 'text-amber-400'}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <div className="ml-3 text-center">
        <p className={`text-xs font-medium ${isUrgent ? 'text-red-300' : 'text-amber-300'}`}>
          {isUrgent ? '⚠️ ÚLTIMOS MINUTOS!' : '⏰ Oferta Limitada'}
        </p>
        <p className={`text-xs ${isUrgent ? 'text-red-200' : 'text-amber-200'}`}>
          {isUrgent ? 'Não perca esta oportunidade!' : 'Apenas hoje disponível'}
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;