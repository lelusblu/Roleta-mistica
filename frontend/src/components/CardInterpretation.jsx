import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sparkles, BookOpen, Eye, Crown, Zap } from 'lucide-react';

const CardInterpretation = ({ card, question, userName, onProceedToDestiny }) => {
  const [showContent, setShowContent] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    if (card) {
      // Mostrar contenido con delay dramático
      setTimeout(() => setShowContent(true), 500);
      // Mostrar CTA después de leer la interpretación
      setTimeout(() => setShowCTA(true), 4000);
    }
  }, [card]);

  if (!card) return null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <Card className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 border-amber-400 border-2 shadow-2xl overflow-hidden relative">
        {/* Efecto de brillo mágico */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent animate-pulse"></div>
        
        <CardHeader className="text-center pb-4 relative z-10">
          <div className="flex justify-center mb-4">
            <div className={`w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-3xl md:text-5xl shadow-2xl transform transition-all duration-1000 ${showContent ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
              {card.image}
            </div>
          </div>
          
          <div className={`transform transition-all duration-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <CardTitle className="text-2xl md:text-3xl font-bold text-amber-400 mb-3">
              🔮 La Carta Revelada para {userName}
            </CardTitle>
            <h2 className="text-xl md:text-2xl font-bold text-amber-300 mb-2">
              {card.name}
            </h2>
            <p className="text-amber-200 text-sm md:text-base italic mb-2">{card.nameEn}</p>
            <Badge variant="secondary" className="bg-purple-800 text-amber-300 mx-auto text-sm">
              {card.arcana}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className={`space-y-4 md:space-y-6 px-4 md:px-6 relative z-10 transform transition-all duration-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Pregunta con destaque */}
          <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 rounded-xl p-4 md:p-6 border-2 border-amber-400/50 shadow-lg">
            <div className="flex items-center mb-3">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-amber-400 mr-3" />
              <span className="text-amber-400 font-bold text-lg md:text-xl">Tu Pregunta Sagrada:</span>
            </div>
            <p className="text-amber-100 italic text-lg md:text-xl font-medium leading-relaxed">
              "{question}"
            </p>
          </div>
          
          {/* Interpretación mística más dramática */}
          <div className="bg-gradient-to-br from-purple-900/40 to-black/40 rounded-xl p-4 md:p-6 border-2 border-purple-400/50 shadow-lg">
            <div className="flex items-center mb-4">
              <Eye className="w-5 h-5 md:w-6 md:h-6 text-purple-400 mr-3" />
              <span className="text-purple-400 font-bold text-lg md:text-xl">Lo Que el Universo Revela:</span>
            </div>
            <p className="text-purple-100 leading-relaxed text-base md:text-lg mb-4">
              <span className="text-amber-300 font-semibold">{userName}</span>, {card.interpretation}
            </p>
            
            {/* Significados en cards menores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div className="bg-green-900/30 rounded-lg p-3 border border-green-400/40">
                <h4 className="text-green-400 font-bold mb-2 text-sm md:text-base flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Energía Positiva
                </h4>
                <p className="text-green-100 text-xs md:text-sm">{card.meanings.upright}</p>
              </div>
              <div className="bg-red-900/30 rounded-lg p-3 border border-red-400/40">
                <h4 className="text-red-400 font-bold mb-2 text-sm md:text-base flex items-center">
                  <Crown className="w-4 h-4 mr-2" />
                  Desafío a Superar
                </h4>
                <p className="text-red-100 text-xs md:text-sm">{card.meanings.reversed}</p>
              </div>
            </div>
          </div>

          {/* CTA Dramático */}
          {showCTA && (
            <div className="mt-8 bg-gradient-to-r from-amber-900/60 to-amber-700/60 rounded-xl p-6 md:p-8 border-2 border-amber-400 shadow-2xl text-center">
              <div className="text-4xl md:text-6xl mb-4">✨</div>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-300 mb-4">
                Pero Esto Es Solo el Comienzo...
              </h3>
              <p className="text-amber-100 text-lg md:text-xl mb-4 leading-relaxed">
                <span className="text-amber-300 font-semibold">{userName}</span>, esta carta reveló tu energía actual, pero los <span className="text-amber-400 font-bold">Áureos guardan un secreto mucho mayor</span> que puede transformar completamente tu destino...
              </p>
              <p className="text-amber-200 text-base md:text-lg mb-6 italic">
                🔮 El universo te eligió para recibir el <span className="text-amber-400 font-bold">"Códice de la Abundancia"</span> - el mismo conocimiento que llevó a los Áureos al poder y prosperidad infinita.
              </p>
              
              <Button 
                onClick={onProceedToDestiny}
                size="lg"
                className="w-full max-w-xs mx-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-bold py-3 px-4 text-sm md:text-lg rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <Crown className="mr-1 h-4 w-4 md:h-5 md:w-5" />
                🏛️ REVELAR EL SECRETO
              </Button>
              
              <p className="text-amber-300/70 text-sm md:text-base mt-4">
                ⚡ Descubrir ahora el conocimiento que cambió civilizaciones enteras
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CardInterpretation;