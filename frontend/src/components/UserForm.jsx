import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { User, Mail, MessageCircle, Sparkles } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validaciones
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.question.trim()) {
      newErrors.question = 'La pregunta es obligatoria para una lectura precisa';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      toast({
        title: "✨ Preparando tu consulta mística...",
        description: `${formData.name}, el universo está alineando las energías para ti`,
        duration: 3000,
      });
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <Card className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 border-amber-400/50 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center animate-pulse">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-gray-900" />
            </div>
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold text-amber-400 mb-2">
            Despierta Tu Destino Místico
          </CardTitle>
          <p className="text-amber-200 text-sm md:text-base">
            El universo está listo para revelar tus secretos más profundos
          </p>
        </CardHeader>
        
        <CardContent className="px-4 md:px-6">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <Label className="text-amber-400 flex items-center text-sm md:text-base">
                <User className="w-4 h-4 mr-2" />
                ¿Cuál es tu nombre?
              </Label>
              <Input
                type="text"
                placeholder="Escribe tu nombre completo"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`bg-black/30 border-amber-400/30 text-amber-100 placeholder-amber-300/50 focus:border-amber-400 text-sm md:text-base py-3 ${
                  errors.name ? 'border-red-400' : ''
                }`}
              />
              {errors.name && (
                <p className="text-red-400 text-xs md:text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-amber-400 flex items-center text-sm md:text-base">
                <Mail className="w-4 h-4 mr-2" />
                Tu email para recibir las revelaciones místicas
              </Label>
              <Input
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`bg-black/30 border-amber-400/30 text-amber-100 placeholder-amber-300/50 focus:border-amber-400 text-sm md:text-base py-3 ${
                  errors.email ? 'border-red-400' : ''
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs md:text-sm">{errors.email}</p>
              )}
            </div>

            {/* Pregunta */}
            <div className="space-y-2">
              <Label className="text-amber-400 flex items-center text-sm md:text-base">
                <MessageCircle className="w-4 h-4 mr-2" />
                ¿Qué pregunta arde en tu corazón?
              </Label>
              <Textarea
                placeholder="Ej: ¿Qué energía debo enfocar para atraer abundancia en mi vida?"
                value={formData.question}
                onChange={(e) => handleChange('question', e.target.value)}
                className={`bg-black/30 border-amber-400/30 text-amber-100 placeholder-amber-300/50 focus:border-amber-400 min-h-16 md:min-h-20 text-sm md:text-base ${
                  errors.question ? 'border-red-400' : ''
                }`}
                maxLength={200}
              />
              {errors.question && (
                <p className="text-red-400 text-xs md:text-sm">{errors.question}</p>
              )}
              <p className="text-amber-300/50 text-xs">
                Sé específico para una lectura más precisa • {formData.question.length}/200
              </p>
            </div>

            <Button 
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-bold py-4 md:py-4 text-base md:text-lg rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Iniciar Consulta Mística
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserForm;