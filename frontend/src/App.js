import React, { useState, useEffect } from "react";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import { toast } from "./hooks/use-toast";
import TarotWheel from "./components/TarotWheel";
import CardInterpretation from "./components/CardInterpretation";
import ReadingHistory from "./components/ReadingHistory";
import UserForm from "./components/UserForm";
import StepProgress from "./components/StepProgress";
import PromotionalPage from "./components/PromotionalPage";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Sparkles, Gem, Moon, Stars, RotateCcw } from "lucide-react";
import { getMockReadingHistory, addToHistory } from "./data/mock";

const STORAGE_KEY = 'mystic_wheel_completed';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [readings, setReadings] = useState([]);
  const [hasCompletedTest, setHasCompletedTest] = useState(false);

  useEffect(() => {
    // Verificar se usuário já fez o teste
    const completed = localStorage.getItem(STORAGE_KEY);
    if (completed) {
      setHasCompletedTest(true);
    }
    
    // Carregar histórico mock na inicialização
    setReadings(getMockReadingHistory());
  }, []);

  const handleUserFormSubmit = (formData) => {
    setUserData(formData);
    setCurrentStep(2);
    
    setTimeout(() => {
      toast({
        title: "🌟 Energias Alinhadas",
        description: "O universo está preparando sua revelação...",
        duration: 2000,
      });
    }, 1000);
  };

  const handleCardSelected = (card) => {
    setSelectedCard(card);
    
    // Adicionar ao histórico
    const newReading = addToHistory(card, userData.question);
    setReadings(prev => [newReading, ...prev]);
    
    // Marcar como completado
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completedAt: new Date().toISOString(),
      userData: userData
    }));
    
    // Mostrar toast com drama
    toast({
      title: "🔮 O Destino Foi Revelado!",
      description: `${card.name} traz uma mensagem especial para você, ${userData.name}`,
      duration: 4000,
    });

    // Avançar para próxima etapa após alguns segundos
    setTimeout(() => {
      setCurrentStep(3);
      toast({
        title: "✨ Momento Especial",
        description: "O universo tem algo exclusivo reservado para você...",
        duration: 3000,
      });
    }, 3000);
  };

  const resetApp = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasCompletedTest(false);
    setCurrentStep(1);
    setUserData(null);
    setSelectedCard(null);
    window.location.reload();
  };

  // Se usuário já completou o teste
  if (hasCompletedTest) {
    const completedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
        {/* Efeitos de fundo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-amber-400/20 text-4xl animate-pulse">
            <Stars />
          </div>
          <div className="absolute top-40 right-20 text-purple-400/20 text-3xl animate-bounce">
            <Gem />
          </div>
          <div className="absolute bottom-20 left-20 text-amber-400/20 text-5xl animate-pulse">
            <Moon />
          </div>
          <div className="absolute bottom-40 right-10 text-purple-400/20 text-2xl animate-bounce">
            <Sparkles />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent mb-4">
              Consulta Já Realizada
            </h1>
            <p className="text-amber-200 text-lg mb-6">
              Você já descobriu seus segredos místicos, {completedData.userData?.name || 'visitante'}!
            </p>
          </div>

          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 border-amber-400/50 text-center p-8">
            <div className="text-6xl mb-4">🔮</div>
            <h3 className="text-2xl font-bold text-amber-400 mb-4">
              O Universo Já Falou
            </h3>
            <p className="text-amber-200 mb-6">
              Sua jornada mística foi completada. O cosmos permite apenas uma consulta por alma para preservar a autenticidade da revelação.
            </p>
            <p className="text-amber-300/70 mb-6 text-sm">
              Consulta realizada em: {new Date(completedData.completedAt).toLocaleDateString('pt-BR')}
            </p>
            
            {/* Link para promocional */}
            <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-400/50 mb-6">
              <p className="text-amber-300 font-medium mb-2">
                🎁 Não perca seu acesso exclusivo:
              </p>
              <Button 
                onClick={() => window.open('https://www.sophialaurentofficiall.com/', '_blank')}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-bold"
              >
                Acessar Códice de la Abundancia
              </Button>
            </div>

            <Button 
              onClick={resetApp}
              variant="outline"
              className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar (Para Teste)
            </Button>
          </Card>
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-amber-400/20 text-4xl animate-pulse">
          <Stars />
        </div>
        <div className="absolute top-40 right-20 text-purple-400/20 text-3xl animate-bounce">
          <Gem />
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
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent mb-4">
            Roleta Mística
          </h1>
          <p className="text-amber-200 text-xl mb-2">
            Descubra os segredos do tarot
          </p>
          <p className="text-amber-300/70">
            Uma experiência única de revelação espiritual
          </p>
        </div>

        {/* Progress Bar */}
        <StepProgress currentStep={currentStep} />

        {/* Content baseado na etapa */}
        {currentStep === 1 && (
          <UserForm onSubmit={handleUserFormSubmit} />
        )}

        {currentStep === 2 && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Coluna da Roleta */}
            <div className="flex flex-col space-y-8">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-amber-400 mb-2">
                  {userData?.name}, concentre-se em sua pergunta
                </h2>
                <p className="text-amber-200 italic">
                  "{userData?.question}"
                </p>
              </div>
              
              <div className="flex justify-center">
                <TarotWheel 
                  onCardSelected={handleCardSelected}
                  isSpinning={isSpinning}
                  setIsSpinning={setIsSpinning}
                />
              </div>
            </div>

            {/* Coluna da Interpretação */}
            <div className="space-y-8">
              {selectedCard ? (
                <CardInterpretation 
                  card={selectedCard} 
                  question={userData?.question}
                />
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4 animate-pulse">🔮</div>
                  <h3 className="text-2xl font-bold text-amber-400 mb-2">
                    O Universo Está Escolhendo...
                  </h3>
                  <p className="text-amber-200">
                    {userData?.name}, sua carta está sendo selecionada pelas energias cósmicas
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <PromotionalPage userData={userData} />
        )}

        {/* Histórico - apenas nas etapas 1 e 2 */}
        {currentStep <= 2 && (
          <div className="mt-12">
            <ReadingHistory readings={readings} />
          </div>
        )}
      </div>

      <Toaster />
    </div>
  );
}

export default App;