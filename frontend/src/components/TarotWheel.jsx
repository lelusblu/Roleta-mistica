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
    <div className="flex flex-col items-center space-y-8">
      {/* Instruções claras */}
      <div className="text-center mb-6 p-6 bg-gradient-to-r from-amber-900/40 to-amber-800/40 rounded-xl border-2 border-amber-400/60 shadow-2xl">
        <h3 className="text-3xl font-bold text-amber-300 mb-3 animate-pulse">
          🎯 CLIQUE NO BOTÃO PARA GIRAR
        </h3>
        <p className="text-amber-100 text-xl font-semibold">
          ↓ Sua carta mística será revelada ↓
        </p>
      </div>

      {/* Roleta Simplificada */}
      <div className="relative flex justify-center items-center">
        {/* Indicador */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-amber-400 drop-shadow-lg"></div>
        </div>
        
        {/* Círculo da roleta - VERSÃO SIMPLES */}
        <div className="relative">
          <div 
            className="w-80 h-80 rounded-full border-8 border-amber-400 shadow-2xl relative overflow-hidden"
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
            {/* Símbolos místicos fixos - SEM REACT CHILDREN DINÂMICOS */}
            <div className="absolute inset-4 rounded-full bg-gray-900/80 flex items-center justify-center">
              <div className="text-6xl text-amber-400">
                🔮
              </div>
            </div>
            
            {/* Marcações da roleta - ESTÁTICAS */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-4 h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-4 h-4 bg-amber-400 rounded-full"></div>
            
            {/* Marcações diagonais */}
            <div className="absolute top-12 right-12 w-4 h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute top-12 left-12 w-4 h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute bottom-12 right-12 w-4 h-4 bg-amber-400 rounded-full"></div>
            <div className="absolute bottom-12 left-12 w-4 h-4 bg-amber-400 rounded-full"></div>
          </div>

          {/* Efeitos visuais - FORA DO ELEMENTO QUE GIRA */}
          {isSpinning && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 rounded-full border-4 border-amber-400/50 animate-ping"></div>
              <div className="absolute inset-4 rounded-full border-2 border-purple-400/30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-8 rounded-full border-2 border-amber-300/20 animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Botão de girar */}
      <div className="text-center space-y-6">
        <Button 
          onClick={spinWheel} 
          disabled={isSpinning}
          size="lg"
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-bold py-8 px-16 text-3xl rounded-full shadow-2xl transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
        >
          {isSpinning ? (
            <>
              <Sparkles className="mr-4 h-8 w-8 animate-spin" />
              🎰 GIRANDO...
            </>
          ) : (
            <>
              <Play className="mr-4 h-8 w-8" />
              🎯 GIRAR AGORA!
            </>
          )}
        </Button>
        
        {isSpinning ? (
          <div className="space-y-3">
            <p className="text-amber-300 text-2xl font-bold animate-pulse">
              ✨ O universo está escolhendo...
            </p>
            <p className="text-amber-200 text-lg">
              🔮 Aguarde a revelação mística
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-amber-400 text-2xl font-bold animate-bounce">
              👆 CLIQUE NO BOTÃO ACIMA!
            </p>
            <p className="text-amber-300 text-lg">
              Para descobrir sua carta do destino
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TarotWheel;