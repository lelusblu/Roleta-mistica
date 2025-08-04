import React, { useState, useEffect } from "react";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import { toast } from "./hooks/use-toast";
import TarotWheel from "./components/TarotWheel";
import CardInterpretation from "./components/CardInterpretation";
import ReadingHistory from "./components/ReadingHistory";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Sparkles, Gem, Moon, Stars } from "lucide-react";
import { getMockReadingHistory, addToHistory } from "./data/mock";

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [question, setQuestion] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    // Carregar histórico mock na inicialização
    setReadings(getMockReadingHistory());
  }, []);

  const handleCardSelected = (card) => {
    setSelectedCard(card);
    setCurrentQuestion(question);
    
    // Adicionar ao histórico
    const newReading = addToHistory(card, question);
    setReadings(prev => [newReading, ...prev]);
    
    // Limpar pergunta
    setQuestion("");
    
    // Mostrar toast de sucesso
    toast({
      title: "🔮 Carta Revelada!",
      description: `${card.name} foi escolhida para você`,
      duration: 3000,
    });
  };

  const resetReading = () => {
    setSelectedCard(null);
    setCurrentQuestion("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-amber-400/20 text-4xl animate-pulse">
          <Stars />
        </div>
        <div className="absolute top-40 right-20 text-purple-400/20 text-3xl animate-bounce">
          <Crystal />
        </div>
        <div className="absolute bottom-20 left-20 text-amber-400/20 text-5xl animate-pulse">
          <Moon />
        </div>
        <div className="absolute bottom-40 right-10 text-purple-400/20 text-2xl animate-bounce">
          <Sparkles />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent mb-4">
            Roleta Mística
          </h1>
          <p className="text-amber-200 text-xl mb-2">
            Descubra os segredos do tarot
          </p>
          <p className="text-amber-300/70">
            Faça uma pergunta e deixe o universo escolher sua carta
          </p>
        </div>

        {/* Pergunta */}
        {!selectedCard && (
          <Card className="max-w-md mx-auto mb-8 bg-black/40 border-amber-400/50">
            <div className="p-6">
              <label className="block text-amber-400 text-sm font-medium mb-3">
                Qual é sua pergunta para o universo?
              </label>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Ex: Que energia devo focar hoje?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="bg-black/30 border-amber-400/30 text-amber-100 placeholder-amber-300/50 focus:border-amber-400"
                  maxLength={100}
                />
              </div>
              <p className="text-amber-300/50 text-xs mt-2">
                Opcional, mas recomendado para uma leitura mais precisa
              </p>
            </div>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Coluna da Roleta */}
          <div className="flex flex-col space-y-8">
            <div className="flex justify-center">
              <TarotWheel 
                onCardSelected={handleCardSelected}
                isSpinning={isSpinning}
                setIsSpinning={setIsSpinning}
              />
            </div>
            
            {/* Botão de nova leitura */}
            {selectedCard && (
              <div className="text-center">
                <Button 
                  onClick={resetReading}
                  variant="outline"
                  className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Nova Leitura
                </Button>
              </div>
            )}
          </div>

          {/* Coluna da Interpretação */}
          <div className="space-y-8">
            {selectedCard ? (
              <CardInterpretation 
                card={selectedCard} 
                question={currentQuestion}
              />
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔮</div>
                <h3 className="text-2xl font-bold text-amber-400 mb-2">
                  Pronto para sua leitura?
                </h3>
                <p className="text-amber-200">
                  Concentre-se em sua pergunta e gire a roleta
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Histórico */}
        <div className="mt-12">
          <ReadingHistory readings={readings} />
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default App;