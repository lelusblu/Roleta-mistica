import React, { useState, useCallback, useRef } from 'react';
import { Button } from './ui/button';
import { Sparkles, Play } from 'lucide-react';
import { tarotCards, getRandomCard } from '../data/mock';

const TarotWheel = ({ onCardSelected, isSpinning, setIsSpinning }) => {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);

  const spinWheel = useCallback(() => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Gerar rotação aleatória
    const spins = 5 + Math.random() * 5; // 5-10 voltas completas
    const finalRotation = rotation + (360 * spins) + Math.random() * 360;
    
    setRotation(finalRotation);
    
    // Selecionar carta após animação
    const timer = setTimeout(() => {
      const card = getRandomCard();
      onCardSelected(card);
      setIsSpinning(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isSpinning, rotation, onCardSelected, setIsSpinning]);

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Instruções claras */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-amber-400 mb-2">
          🎯 CLIQUE NO BOTÃO PARA GIRAR A ROLETA
        </h3>
        <p className="text-amber-200 text-sm">
          ↓ A carta do seu destino será revelada após a roleta parar ↓
        </p>
      </div>

      {/* Roleta */}
      <div className="relative" ref={wheelRef}>
        {/* Indicador da roleta */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-amber-400"></div>
        </div>
        
        {/* Círculo da roleta */}
        <div 
          className="relative w-80 h-80 rounded-full border-8 border-amber-400 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 shadow-2xl transition-transform duration-3000 ease-out"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            willChange: 'transform'
          }}
        >
          {/* Cartas ao redor da roleta */}
          {tarotCards.slice(0, 8).map((card, index) => {
            const angle = (360 / 8) * index;
            const radians = (angle * Math.PI) / 180;
            const radius = 120;
            const x = Math.cos(radians) * radius;
            const y = Math.sin(radians) * radius;
            
            return (
              <div
                key={`card-${card.id}-${index}`}
                className="absolute w-12 h-12 flex items-center justify-center bg-amber-100 rounded-full border-2 border-amber-400 text-2xl"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                  willChange: 'transform'
                }}
              >
                {card.image}
              </div>
            );
          })}
          
          {/* Centro da roleta */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-gray-900" />
            </div>
          </div>
        </div>

        {/* Efeitos visuais de spin */}
        {isSpinning && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-amber-400 opacity-30 animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-2 border-purple-400 opacity-20 animate-ping" style={{ animationDelay: '0.3s' }}></div>
          </div>
        )}
      </div>
      
      {/* Botão de girar */}
      <div className="text-center">
        <Button 
          onClick={spinWheel} 
          disabled={isSpinning}
          size="lg"
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-bold py-6 px-10 text-xl rounded-full shadow-2xl transform transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse"
        >
          {isSpinning ? (
            <>
              <Sparkles className="mr-3 h-6 w-6 animate-spin" />
              🎰 Girando a Roleta...
            </>
          ) : (
            <>
              <Play className="mr-3 h-6 w-6" />
              🎯 GIRAR ROLETA MÍSTICA
            </>
          )}
        </Button>
        
        {isSpinning && (
          <p className="text-amber-300 text-sm mt-3 animate-pulse">
            ✨ As energias cósmicas estão escolhendo sua carta...
          </p>
        )}
      </div>
    </div>
  );
};

export default TarotWheel;