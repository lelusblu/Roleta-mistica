import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sparkles, BookOpen, Star, Crown, Zap, ExternalLink } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

const PromotionalPage = ({ userData }) => {
  const [availableSpots] = useState(Math.floor(Math.random() * 8) + 3); // 3-10 vagas restantes

  const handleCTAClick = () => {
    // Abrir em nova aba com configurações de segurança
    const newWindow = window.open('https://www.sophialaurentofficiall.com/', '_blank', 'noopener,noreferrer');
    
    // Fallback caso o popup seja bloqueado
    if (!newWindow) {
      window.location.href = 'https://www.sophialaurentofficiall.com/';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent mb-4">
          ¡{userData?.name}, Tu Destino Te Espera!
        </h1>
        <p className="text-xl text-amber-200 mb-6">
          El universo ha revelado tu carta... ahora descubre el secreto completo
        </p>
      </div>

      {/* Timer e Urgência */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <CountdownTimer initialMinutes={15} />
        <Badge variant="destructive" className="bg-red-600 text-white text-sm px-4 py-2 animate-bounce">
          🔥 Últimas {availableSpots} vagas disponibles
        </Badge>
      </div>

      {/* Main CTA Card */}
      <Card className="bg-gradient-to-br from-gray-900 via-purple-900 to-black border-amber-400 border-2 shadow-2xl overflow-hidden relative">
        {/* Efeitos de fundo */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-purple-500/10 animate-pulse"></div>
        
        <CardHeader className="text-center pb-6 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center animate-spin-slow">
                <BookOpen className="w-12 h-12 text-gray-900" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <CardTitle className="text-3xl md:text-4xl font-bold text-amber-400 mb-4">
            El Secreto de Los Áureos
          </CardTitle>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl text-amber-100 leading-relaxed mb-6 italic">
              "Los Áureos guardaron un secreto en sus pergaminos: descubre el 
              <span className="text-amber-400 font-bold"> 'Códice de la Abundancia' </span>
              que iluminó su camino…"
            </p>
            
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
              ))}
            </div>
            
            <p className="text-lg text-amber-200">
              Haz clic y explora el legado que cambió su destino…
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10">
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-black/30 rounded-lg border border-amber-400/30">
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <h3 className="font-bold text-amber-300 mb-2">Sabiduría Ancestral</h3>
              <p className="text-amber-100 text-sm">Secretos de abundancia milenarios</p>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg border border-amber-400/30">
              <Zap className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <h3 className="font-bold text-amber-300 mb-2">Transformación Inmediata</h3>
              <p className="text-amber-100 text-sm">Cambia tu realidad desde hoy</p>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg border border-amber-400/30">
              <Crown className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <h3 className="font-bold text-amber-300 mb-2">Acceso Exclusivo</h3>
              <p className="text-amber-100 text-sm">Solo para elegidos como tú</p>
            </div>
          </div>

          {/* Main CTA Button */}
          <div className="text-center">
            <Button 
              onClick={handleCTAClick}
              size="lg"
              className="w-48 mx-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-bold py-4 px-6 text-sm rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 animate-pulse flex items-center justify-center border-4 border-amber-300"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              📖 VER CÓDICE AHORA
            </Button>
            
            <p className="text-amber-300/70 text-sm mt-4">
              🔒 Acceso seguro e inmediato • ⚡ Descarga instantánea
            </p>
          </div>

          {/* Testimoniales rápidos */}
          <div className="bg-black/40 rounded-lg p-6 border border-amber-400/30">
            <h4 className="text-amber-400 font-bold text-center mb-4">Lo que dicen quienes ya lo tienen:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="text-amber-100">
                <p className="italic">"Cambió mi vida en 30 días. La abundancia llegó de formas inesperadas."</p>
                <p className="text-amber-300 mt-1">- María Elena, 34 años</p>
              </div>
              <div className="text-amber-100">
                <p className="italic">"Los secretos que revela son oro puro. Increíble transformación."</p>
                <p className="text-amber-300 mt-1">- Carlos Rodriguez, 41 años</p>
              </div>
            </div>
          </div>

          {/* Warning final */}
          <div className="bg-red-900/30 border border-red-400/50 rounded-lg p-4 text-center">
            <p className="text-red-300 font-bold">
              ⚠️ Esta oportunidad expira cuando termine el contador
            </p>
            <p className="text-red-200 text-sm mt-1">
              No habrá segunda oportunidad. El universo te ha elegido HOY.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionalPage;