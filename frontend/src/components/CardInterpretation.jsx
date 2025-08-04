import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, BookOpen } from 'lucide-react';

const CardInterpretation = ({ card, question }) => {
  if (!card) return null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 border-amber-400 border-2 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-4xl shadow-lg">
              {card.image}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-amber-400 mb-2">
            {card.name}
          </CardTitle>
          <p className="text-amber-200 text-sm italic">{card.nameEn}</p>
          <Badge variant="secondary" className="bg-purple-800 text-amber-300 mx-auto">
            {card.arcana}
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {question && (
            <div className="bg-black/30 rounded-lg p-4 border border-amber-400/30">
              <div className="flex items-center mb-2">
                <BookOpen className="w-4 h-4 text-amber-400 mr-2" />
                <span className="text-amber-400 font-medium text-sm">Sua Pergunta:</span>
              </div>
              <p className="text-amber-100 italic">"{question}"</p>
            </div>
          )}
          
          <div className="bg-black/30 rounded-lg p-4 border border-amber-400/30">
            <div className="flex items-center mb-3">
              <Sparkles className="w-4 h-4 text-amber-400 mr-2" />
              <span className="text-amber-400 font-medium">Interpretação Mística</span>
            </div>
            <p className="text-amber-100 leading-relaxed">{card.interpretation}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-900/20 rounded-lg p-4 border border-green-400/30">
              <h4 className="text-green-400 font-medium mb-2">Posição Normal</h4>
              <p className="text-green-100 text-sm">{card.meanings.upright}</p>
            </div>
            <div className="bg-red-900/20 rounded-lg p-4 border border-red-400/30">
              <h4 className="text-red-400 font-medium mb-2">Posição Invertida</h4>
              <p className="text-red-100 text-sm">{card.meanings.reversed}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardInterpretation;