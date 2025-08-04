import React from 'react';
import { CheckCircle, Circle, User, Sparkles, Gift } from 'lucide-react';

const StepProgress = ({ currentStep }) => {
  const steps = [
    { id: 1, title: 'Seus Dados', icon: User, desc: 'Nome e email' },
    { id: 2, title: 'Revelação', icon: Sparkles, desc: 'Consulta mística' },
    { id: 3, title: 'Seu Destino', icon: Gift, desc: 'Segredo revelado' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500
                  ${isCompleted 
                    ? 'bg-amber-500 border-amber-500 text-gray-900' 
                    : isCurrent 
                      ? 'bg-amber-400/20 border-amber-400 text-amber-400 animate-pulse' 
                      : 'bg-gray-800 border-gray-600 text-gray-400'
                  }
                `}>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <StepIcon className="w-6 h-6" />
                  )}
                </div>
                <div className="text-center mt-2">
                  <p className={`text-sm font-medium ${isCurrent ? 'text-amber-400' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-4 transition-all duration-500
                  ${isCompleted ? 'bg-amber-500' : 'bg-gray-600'}
                `} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;