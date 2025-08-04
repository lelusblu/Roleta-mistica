import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, BookOpen } from 'lucide-react';

const CardInterpretation = ({ card, question }) => {
  if (!card) return null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <Card className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 border-amber-400 border-2 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl md:text-4xl shadow-lg">
              {card.image}
            </div>
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold text-amber-400 mb-2">
            {card.name}
          </CardTitle>
          <p className="text-amber-200 text-xs md:text-sm italic">{card.nameEn}</p>
          <Badge variant="secondary" className="bg-purple-800 text-amber-300 mx-auto text-xs md:text-sm">
            {card.arcana}
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
          {question && (
            <div className="bg-black/30 rounded-lg p-3 md:p-4 border border-amber-400/30">
              <div className="flex items-center mb-2">
                <BookOpen className="w-3 h-3 md:w-4 md:h-4 text-amber-400 mr-2" />
                <span className="text-amber-400 font-medium text-xs md:text-sm">Sua Pergunta:</span>
              </div>
              <p className="text-amber-100 italic text-sm md:text-base">"{question}"</p>
            </div>
          )}
          
          <div className="bg-black/30 rounded-lg p-3 md:p-4 border border-amber-400/30">
            <div className="flex items-center mb-3">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-amber-400 mr-2" />
              <span className="text-amber-400 font-medium text-sm md:text-base">Interpretação Mística</span>
            </div>
            <p className="text-amber-100 leading-relaxed text-sm md:text-base">{card.interpretation}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-900/20 rounded-lg p-3 md:p-4 border border-green-400/30">
              <h4 className="text-green-400 font-medium mb-2 text-sm md:text-base">Posição Normal</h4>
              <p className="text-green-100 text-xs md:text-sm">{card.meanings.upright}</p>
            </div>
            <div className="bg-red-900/20 rounded-lg p-3 md:p-4 border border-red-400/30">
              <h4 className="text-red-400 font-medium mb-2 text-sm md:text-base">Posição Invertida</h4>
              <p className="text-red-100 text-xs md:text-sm">{card.meanings.reversed}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardInterpretation;