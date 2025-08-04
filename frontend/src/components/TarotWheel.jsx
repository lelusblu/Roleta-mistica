import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Sparkles, Play } from 'lucide-react';
import { tarotCards, getRandomCard } from '../data/mock';

const TarotWheel = ({ onCardSelected, isSpinning, setIsSpinning }) => {
  const [rotation, setRotation] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedCard(null);
    
    // Gerar rotação aleatória (múltiplos completos + rotação extra)
    const spins = 5 + Math.random() * 5; // 5-10 voltas completas
    const finalRotation = rotation + (360 * spins) + Math.random() * 360;
    
    setRotation(finalRotation);
    
    // Selecionar carta após animação
    setTimeout(() => {
      const card = getRandomCard();
      setSelectedCard(card);
      onCardSelected(card);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Roleta */}
      <div className="relative">
        {/* Indicador da roleta */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-amber-400"></div>
        </div>
        
        {/* Círculo da roleta */}
        <div 
          className={`relative w-80 h-80 rounded-full border-8 border-amber-400 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 shadow-2xl transform transition-transform duration-3000 ease-out ${isSpinning ? 'animate-pulse' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Cartas ao redor da roleta */}
          {tarotCards.map((card, index) => {
            const angle = (360 / tarotCards.length) * index;
            const radians = (angle * Math.PI) / 180;
            const radius = 120;
            const x = Math.cos(radians) * radius;
            const y = Math.sin(radians) * radius;
            
            return (
              <div
                key={card.id}
                className="absolute w-12 h-12 flex items-center justify-center bg-amber-100 rounded-full border-2 border-amber-400 text-2xl transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: `translate(-50%, -50%) rotate(${-rotation}deg)`
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
      </div>
      
      {/* Botão de girar */}
      <Button 
        onClick={spinWheel} 
        disabled={isSpinning}
        size="lg"
        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSpinning ? (
          <>
            <Sparkles className="mr-2 h-5 w-5 animate-spin" />
            Girando...
          </>
        ) : (
          <>
            <Play className="mr-2 h-5 w-5" />
            Girar a Roleta Mística
          </>
        )}
      </Button>
      
      {/* Efeitos visuais */}
      {isSpinning && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-amber-400 opacity-30 animate-ping"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-2 border-purple-400 opacity-20 animate-ping animation-delay-300"></div>
        </div>
      )}
    </div>
  );
};

export default TarotWheel;