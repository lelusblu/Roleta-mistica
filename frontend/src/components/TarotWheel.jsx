import React, { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Sparkles, Play } from 'lucide-react';
import { getRandomCard } from '../data/mock';

const TarotWheel = ({ onCardSelected, isSpinning, setIsSpinning }) => {
  const [rotation, setRotation] = useState(0);

  // Cards fixos para a roleta (8 cards para melhor performance)
  const wheelCards = [
    { id: 'w1', emoji: '🌟', name: 'Estrela' },
    { id: 'w2', emoji: '🔮', name: 'Cristal' },
    { id: 'w3', emoji: '🌙', name: 'Lua' },
    { id: 'w4', emoji: '🌺', name: 'Flor' },
    { id: 'w5', emoji: '👑', name: 'Coroa' },
    { id: 'w6', emoji: '📿', name: 'Oração' },
    { id: 'w7', emoji: '💕', name: 'Amor' },
    { id: 'w8', emoji: '🏛️', name: 'Templo' }
  ];

  const spinWheel = useCallback(() => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Calcular nova rotação
    const spins = 5 + Math.random() * 3; // 5-8 voltas
    const extraRotation = Math.random() * 360;
    const newRotation = rotation + (360 * spins) + extraRotation;
    
    setRotation(newRotation);
    
    // Selecionar carta após animação
    setTimeout(() => {
      const card = getRandomCard();
      onCardSelected(card);
      setIsSpinning(false);
    }, 3000);
  }, [isSpinning, rotation, onCardSelected, setIsSpinning]);

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Instruções muito claras */}
      <div className="text-center mb-6 p-4 bg-amber-900/30 rounded-lg border border-amber-400/50">
        <h3 className="text-2xl font-bold text-amber-400 mb-2 animate-pulse">
          🎯 CLIQUE NO BOTÃO PARA GIRAR A ROLETA
        </h3>
        <p className="text-amber-200 text-lg">
          ↓ Sua carta mística será revelada após o giro ↓
        </p>
      </div>

      {/* Container da Roleta */}
      <div className="relative flex justify-center items-center">
        {/* Indicador da roleta */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 z-30">
          <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-amber-400 drop-shadow-lg"></div>
        </div>
        
        {/* Círculo principal da roleta */}
        <div className="relative">
          <div 
            className="w-80 h-80 rounded-full border-8 border-amber-400 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 shadow-2xl relative overflow-hidden"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
            }}
          >
            {/* Cards da roleta - posicionamento fixo */}
            {wheelCards.map((card, index) => {
              const angle = (360 / wheelCards.length) * index;
              const angleRad = (angle * Math.PI) / 180;
              const radius = 110;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;
              
              return (
                <div
                  key={card.id}
                  className="absolute w-14 h-14 flex items-center justify-center bg-amber-100 rounded-full border-3 border-amber-400 text-2xl font-bold shadow-lg"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${-rotation}deg)`,
                    transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
                  }}
                >
                  {card.emoji}
                </div>
              );
            })}
            
            {/* Centro da roleta */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg z-10">
                <Sparkles className="w-10 h-10 text-gray-900" />
              </div>
            </div>
          </div>

          {/* Efeitos visuais de giro - fora do elemento que gira */}
          {isSpinning && (
            <>
              <div className="absolute inset-0 rounded-full border-4 border-amber-400 opacity-50 animate-ping"></div>
              <div className="absolute inset-2 rounded-full border-2 border-purple-400 opacity-30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-4 rounded-full border-2 border-amber-300 opacity-20 animate-ping" style={{ animationDelay: '1s' }}></div>
            </>
          )}
        </div>
      </div>
      
      {/* Botão de girar - bem destacado */}
      <div className="text-center space-y-4">
        <Button 
          onClick={spinWheel} 
          disabled={isSpinning}
          size="lg"
          className={`
            bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 
            text-gray-900 font-bold py-6 px-12 text-2xl rounded-full shadow-2xl 
            transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
            ${!isSpinning ? 'hover:scale-110 animate-bounce' : ''}
          `}
        >
          {isSpinning ? (
            <>
              <Sparkles className="mr-3 h-7 w-7 animate-spin" />
              🎰 GIRANDO A ROLETA...
            </>
          ) : (
            <>
              <Play className="mr-3 h-7 w-7" />
              🎯 GIRAR ROLETA MÍSTICA
            </>
          )}
        </Button>
        
        {isSpinning && (
          <div className="space-y-2">
            <p className="text-amber-300 text-lg font-bold animate-pulse">
              ✨ As energias cósmicas estão escolhendo sua carta...
            </p>
            <p className="text-amber-200 text-sm">
              🔮 Aguarde a revelação do seu destino
            </p>
          </div>
        )}

        {!isSpinning && (
          <p className="text-amber-400 text-lg font-semibold">
            👆 Clique no botão acima para descobrir sua carta!
          </p>
        )}
      </div>
    </div>
  );
};

export default TarotWheel;

export default TarotWheel;