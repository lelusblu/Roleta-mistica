import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { History, Calendar, MessageCircle } from 'lucide-react';

const ReadingHistory = ({ readings }) => {
  if (!readings || readings.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-amber-400/50">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center">
            <History className="w-5 h-5 mr-2" />
            Histórico de Leituras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🔮</div>
            <p className="text-amber-200">Nenhuma leitura realizada ainda.</p>
            <p className="text-amber-300/70 text-sm mt-2">Gire a roleta para começar sua jornada mística!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-amber-400/50">
      <CardHeader>
        <CardTitle className="text-amber-400 flex items-center">
          <History className="w-5 h-5 mr-2" />
          Histórico de Leituras
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80 pr-4">
          <div className="space-y-4">
            {readings.map((reading) => (
              <div 
                key={reading.id}
                className="bg-black/30 rounded-lg p-4 border border-amber-400/30 hover:border-amber-400/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xl">
                      {reading.card.image}
                    </div>
                    <div>
                      <h4 className="text-amber-300 font-medium">{reading.card.name}</h4>
                      <Badge variant="outline" className="text-xs border-purple-400 text-purple-300">
                        {reading.card.arcana}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-400/70 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {reading.timestamp}
                  </div>
                </div>
                
                {reading.question && (
                  <div className="mt-3 p-3 bg-purple-900/20 rounded border border-purple-400/30">
                    <div className="flex items-center mb-2">
                      <MessageCircle className="w-3 h-3 text-purple-300 mr-2" />
                      <span className="text-purple-300 text-xs font-medium">Pergunta:</span>
                    </div>
                    <p className="text-purple-100 text-sm italic">"{reading.question}"</p>
                  </div>
                )}
                
                <div className="mt-3 pt-3 border-t border-amber-400/20">
                  <p className="text-amber-100 text-sm line-clamp-2">
                    {reading.card.interpretation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ReadingHistory;