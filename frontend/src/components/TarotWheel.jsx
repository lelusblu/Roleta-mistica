import React, { useState } from 'react';
import { Button } from './ui/button';
import { Sparkles, Play } from 'lucide-react';
import { getRandomCard } from '../data/mock';

const TarotWheel = ({ onCardSelected, isSpinning, setIsSpinning }) => {
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Calcular nova rotação
    const spins = 5 + Math.random() * 3;
    const newRotation = rotation + (360 * spins) + Math.random() * 360;
    setRotation(newRotation);
    
    // Selecionar carta após animação
    setTimeout(() => {
      const card = getRandomCard();
      onCardSelected(card);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-4 md:space-y-8 px-4">
      {/* Instruções claras - Responsivo */}
      <div className="text-center mb-4 md:mb-6 p-4 md:p-6 bg-gradient-to-r from-amber-900/40 to-amber-800/40 rounded-xl border-2 border-amber-400/60 shadow-2xl w-full max-w-lg">
        <h3 className="text-xl md:text-3xl font-bold text-amber-300 mb-2 md:mb-3 animate-pulse">
          🎯 CLIQUE NO BOTÃO PARA GIRAR
        </h3>
        <p className="text-amber-100 text-lg md:text-xl font-semibold">
          ↓ Sua carta mística será revelada ↓
        </p>
      </div>

      {/* Roleta Responsiva */}
      <div className="relative flex justify-center items-center">
        {/* Indicador */}
        <div className="absolute -top-4 md:-top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="w-0 h-0 border-l-6 md:border-l-8 border-r-6 md:border-r-8 border-b-12 md:border-b-16 border-l-transparent border-r-transparent border-b-amber-400 drop-shadow-lg"></div>
        </div>
        
        {/* Círculo da roleta - Tamanho responsivo */}
        <div className="relative">
          <div 
            className="w-64 h-64 md:w-80 md:h-80 rounded-full border-6 md:border-8 border-amber-400 shadow-2xl relative overflow-hidden"
            style={{ 
              background: `conic-gradient(
                from 0deg,
                #9333ea 0deg,
                #7c3aed 45deg,
                #6366f1 90deg,
                #3b82f6 135deg,
                #0ea5e9 180deg,
                #06b6d4 225deg,
                #14b8a6 270deg,
                #10b981 315deg,
                #9333ea 360deg
              )`,
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
            }}
          >
            {/* Símbolos místicos fixos - Centro responsivo */}
            <div className="absolute inset-3 md:inset-4 rounded-full bg-gray-900/80 flex items-center justify-center">
              <div className="text-4xl md:text-6xl text-amber-400">
                🔮
              </div>
            </div>
            
            {/* Marcações da roleta - Tamanhos responsivos */}
            <div className="absolute top-3 md:top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute top-1/2 right-3 md:right-4 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute top-1/2 left-3 md:left-4 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-amber-400 rounded-full"></div>
            
            {/* Marcações diagonais */}
            <div className="absolute top-8 md:top-12 right-8 md:right-12 w-3 h-3 md:w-4 md:h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute top-8 md:top-12 left-8 md:left-12 w-3 h-3 md:w-4 md:h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute bottom-8 md:bottom-12 right-8 md:right-12 w-3 h-3 md:w-4 md:h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 w-3 h-3 md:w-4 md:h-4 bg-amber-400 rounded-full"></div>
          </div>

          {/* Efeitos visuais - Responsivos */}
          {isSpinning && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 rounded-full border-3 md:border-4 border-amber-400/50 animate-ping"></div>
              <div className="absolute inset-3 md:inset-4 rounded-full border-2 border-purple-400/30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-6 md:inset-8 rounded-full border-2 border-amber-300/20 animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Botão de girar - Responsivo */}
      <div className="text-center space-y-4 md:space-y-6 w-full max-w-sm">
        <Button 
          onClick={spinWheel} 
          disabled={isSpinning}
          size="lg"
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-bold py-6 md:py-8 px-8 md:px-16 text-xl md:text-3xl rounded-full shadow-2xl transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
        >
          {isSpinning ? (
            <>
              <Sparkles className="mr-3 md:mr-4 h-6 w-6 md:h-8 md:w-8 animate-spin" />
              🎰 GIRANDO...
            </>
          ) : (
            <>
              <Play className="mr-3 md:mr-4 h-6 w-6 md:h-8 md:w-8" />
              🎯 GIRAR AGORA!
            </>
          )}
        </Button>
        
        {isSpinning ? (
          <div className="space-y-2 md:space-y-3">
            <p className="text-amber-300 text-lg md:text-2xl font-bold animate-pulse">
              ✨ O universo está escolhendo...
            </p>
            <p className="text-amber-200 text-base md:text-lg">
              🔮 Aguarde a revelação mística
            </p>
          </div>
        ) : (
          <div className="space-y-1 md:space-y-2">
            <p className="text-amber-400 text-lg md:text-2xl font-bold animate-bounce">
              👆 CLIQUE NO BOTÃO ACIMA!
            </p>
            <p className="text-amber-300 text-base md:text-lg">
              Para descobrir sua carta do destino
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TarotWheel;