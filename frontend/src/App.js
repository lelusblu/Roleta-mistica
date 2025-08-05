import React, { useState, useEffect } from "react";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import { toast } from "./hooks/use-toast";
import TarotWheel from "./components/TarotWheel";
import CardInterpretation from "./components/CardInterpretation";
import UserForm from "./components/UserForm";
import StepProgress from "./components/StepProgress";
import PromotionalPage from "./components/PromotionalPage";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Sparkles, Gem, Moon, Stars, RotateCcw } from "lucide-react";
import { addToHistory } from "./data/mock";
import axios from "axios";

const STORAGE_KEY = 'mystic_wheel_completed';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : null;
const IS_STATIC_MODE = !BACKEND_URL || process.env.REACT_APP_MODE === 'static';

// Función para generar session ID único
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Facebook Pixel tracking functions
const trackEvent = (eventName, parameters = {}) => {
  if (window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Mock backend calls for static mode
const mockBackendCall = async (type, data = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (type) {
        case 'lead':
          resolve({
            data: {
              success: true,
              lead_id: `mock_lead_${Date.now()}`,
              message: 'Lead capturado exitosamente (modo estático)',
              existing: false
            }
          });
          break;
        case 'reading':
          resolve({
            data: {
              success: true,
              reading_id: `mock_reading_${Date.now()}`,
              message: 'Lectura registrada exitosamente (modo estático)'
            }
          });
          break;
        default:
          resolve({ data: { success: true } });
      }
    }, 500);
  });
};

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasCompletedTest, setHasCompletedTest] = useState(false);
  const [sessionId] = useState(() => generateSessionId());
  const [leadId, setLeadId] = useState(null);
  const [readingId, setReadingId] = useState(null);

  useEffect(() => {
    // Verificar si el usuario ya hizo la prueba
    const completed = localStorage.getItem(STORAGE_KEY);
    if (completed) {
      setHasCompletedTest(true);
    }
    
    // Track PageView
    trackEvent('PageView');
  }, []);

  const handleUserFormSubmit = async (formData) => {
    try {
      // Track Lead event
      trackEvent('Lead', {
        content_name: 'Formulario Consulta Mística',
        content_category: 'Lead Generation'
      });

      let response;
      if (IS_STATIC_MODE) {
        // Modo estático - usar mock
        response = await mockBackendCall('lead', {
          name: formData.name,
          email: formData.email,
          question: formData.question,
          session_id: sessionId
        });
        
        // Guardar en localStorage para modo estático
        const leadData = {
          ...formData,
          session_id: sessionId,
          lead_id: response.data.lead_id,
          created_at: new Date().toISOString()
        };
        localStorage.setItem('static_lead_data', JSON.stringify(leadData));
      } else {
        // Modo con backend
        response = await axios.post(`${API}/leads/`, {
          name: formData.name,
          email: formData.email,
          question: formData.question,
          session_id: sessionId
        });
      }

      if (response.data.success) {
        setLeadId(response.data.lead_id);
        setUserData(formData);
        setCurrentStep(2);
        
        toast({
          title: "🌟 Energías Alineadas",
          description: `${formData.name}, el universo está preparando tu revelación...`,
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Error al guardar lead:', error);
      toast({
        title: "⚠️ Error Temporal",
        description: "Inténtalo de nuevo en unos momentos",
        duration: 3000,
      });
    }
  };

  const handleCardSelected = async (card) => {
    setSelectedCard(card);
    
    try {
      // Track ViewContent event
      trackEvent('ViewContent', {
        content_name: `Carta ${card.name}`,
        content_category: 'Lectura Tarot'
      });

      let response;
      if (IS_STATIC_MODE) {
        // Modo estático - usar mock
        response = await mockBackendCall('reading', {
          lead_id: leadId,
          card_id: card.id,
          card_name: card.name,
          card_interpretation: card.interpretation,
          question: userData.question,
          session_id: sessionId
        });
        
        // Guardar en localStorage para modo estático
        const readingData = {
          lead_id: leadId,
          card: card,
          question: userData.question,
          session_id: sessionId,
          reading_id: response.data.reading_id,
          created_at: new Date().toISOString()
        };
        localStorage.setItem('static_reading_data', JSON.stringify(readingData));
      } else {
        // Modo con backend
        response = await axios.post(`${API}/readings/`, {
          lead_id: leadId,
          card_id: card.id,
          card_name: card.name,
          card_interpretation: card.interpretation,
          question: userData.question,
          session_id: sessionId
        });
      }

      if (response.data.success) {
        setReadingId(response.data.reading_id);
      }
    } catch (error) {
      console.error('Error al guardar lectura:', error);
    }
    
    // Agregar al historial local (para demo)
    addToHistory(card, userData.question);
    
    // Marcar como completado localmente
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completedAt: new Date().toISOString(),
      userData: userData,
      leadId: leadId,
      readingId: readingId,
      mode: IS_STATIC_MODE ? 'static' : 'backend'
    }));
    
    // Mostrar toast con drama
    toast({
      title: "🔮 ¡El Destino Ha Sido Revelado!",
      description: `${card.name} emerge de las sombras para ${userData.name}...`,
      duration: 4000,
    });
  };

  const proceedToDestiny = async () => {
    try {
      // Track InitiateCheckout event
      trackEvent('InitiateCheckout', {
        content_name: 'Códice de la Abundancia',
        content_category: 'Promoción',
        value: 1,
        currency: 'USD'
      });

      // Registrar clic en la promoción
      if (readingId) {
        if (IS_STATIC_MODE) {
          // Modo estático - guardar en localStorage
          const promoData = {
            reading_id: readingId,
            clicked_at: new Date().toISOString(),
            mode: 'static'
          };
          localStorage.setItem('static_promo_click', JSON.stringify(promoData));
        } else {
          // Modo con backend
          await axios.put(`${API}/readings/${readingId}/promo-click`, {
            clicked_at: new Date().toISOString()
          });
        }
      }
    } catch (error) {
      console.error('Error al registrar clic en la promoción:', error);
    }

    setCurrentStep(3);
    toast({
      title: "🌟 Revelación Completa Desbloqueada",
      description: "Prepárate para descubrir el secreto de los Áureos...",
      duration: 3000,
    });
  };

  const resetApp = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasCompletedTest(false);
    setCurrentStep(1);
    setUserData(null);
    setSelectedCard(null);
    setLeadId(null);
    setReadingId(null);
    window.location.reload();
  };

  // Si el usuario ya completó la prueba
  if (hasCompletedTest) {
    const completedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
        {/* Efectos de fondo */}
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
              Consulta Ya Realizada
            </h1>
            <p className="text-amber-200 text-lg mb-6">
              ¡Ya has descubierto tus secretos místicos, {completedData.userData?.name || 'visitante'}!
            </p>
          </div>

          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 border-amber-400/50 text-center p-8">
            <div className="text-6xl mb-4">🔮</div>
            <h3 className="text-2xl font-bold text-amber-400 mb-4">
              El Universo Ya Ha Hablado
            </h3>
            <p className="text-amber-200 mb-6">
              Tu jornada mística ha sido completada. El cosmos permite solo una consulta por alma para preservar la autenticidad de la revelación.
            </p>
            <p className="text-amber-300/70 mb-6 text-sm">
              Consulta realizada el: {new Date(completedData.completedAt).toLocaleDateString('es-ES')}
            </p>
            
            {/* Link para promocional */}
            <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-400/50 mb-6">
              <p className="text-amber-300 font-medium mb-2">
                🎁 No pierdas tu acceso exclusivo:
              </p>
              <Button 
                onClick={() => {
                  trackEvent('Purchase', {
                    content_name: 'Códice de la Abundancia',
                    content_category: 'E-book',
                    value: 1,
                    currency: 'USD'
                  });
                  window.open('https://www.sophialaurentofficiall.com/', '_blank');
                }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-bold"
              >
                Acceder al Códice de la Abundancia
              </Button>
            </div>

            <Button 
              onClick={resetApp}
              variant="outline"
              className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar (Para Prueba)
            </Button>
          </Card>
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Efectos de fondo */}
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

      <div className="relative z-10 container mx-auto px-4 py-4 md:py-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent mb-2 md:mb-4">
            Ruleta Mística
          </h1>
          <p className="text-amber-200 text-lg md:text-xl mb-1 md:mb-2">
            Descubre los secretos del tarot
          </p>
          <p className="text-amber-300/70 text-sm md:text-base">
            Una experiencia única de revelación espiritual
          </p>
        </div>

        {/* Progress Bar */}
        <StepProgress currentStep={currentStep} />

        {/* Contenido basado en la etapa */}
        {currentStep === 1 && (
          <UserForm onSubmit={handleUserFormSubmit} />
        )}

        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Columna de la Ruleta */}
            <div className="flex flex-col space-y-4 md:space-y-8">
              <div className="text-center mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-2">
                  {userData?.name}, concéntrate en tu pregunta
                </h2>
                <p className="text-amber-200 italic mb-4 text-sm md:text-base px-4">
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

            {/* Columna de la Interpretación */}
            <div className="space-y-6 md:space-y-8">
              {selectedCard ? (
                <CardInterpretation 
                  card={selectedCard} 
                  question={userData?.question}
                  userName={userData?.name}
                  onProceedToDestiny={proceedToDestiny}
                />
              ) : (
                <div className="text-center py-8 md:py-16 px-4">
                  <div className="text-4xl md:text-6xl mb-4 animate-pulse">🔮</div>
                  <h3 className="text-xl md:text-2xl font-bold text-amber-400 mb-2">
                    El Universo Está Eligiendo...
                  </h3>
                  <p className="text-amber-200 text-sm md:text-base mb-4">
                    {userData?.name}, tu carta está siendo seleccionada por las energías cósmicas
                  </p>
                  {!isSpinning && (
                    <div className="mt-4 p-4 bg-amber-900/30 rounded-lg border border-amber-400/30 max-w-sm mx-auto">
                      <p className="text-amber-300 font-bold text-base md:text-lg">
                        👈 ¡HAZ CLIC EN "GIRAR AHORA"!
                      </p>
                      <p className="text-amber-200 text-xs md:text-sm mt-2">
                        Para ver el resultado de tu consulta
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <PromotionalPage userData={userData} />
        )}
      </div>

      <Toaster />
    </div>
  );
}

export default App;