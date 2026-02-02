import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { LifeButton } from "@/components/ui/LifeButton";
import { setOnboarding } from "@/lib/storage";
import { cn } from "@/lib/utils";

export default function Welcome() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "Bienvenido",
      subtitle: "No se trata de dejar algo",
      body: "Se trata de empezar a vivir.",
    },
    {
      title: "LIFE",
      subtitle: "Un camino de conciencia",
      body: "Observar. Elegir. Practicar. Sin juicios, sin presión. A tu ritmo.",
    },
    {
      title: "Tu compañero diario",
      subtitle: "Pequeñas prácticas",
      body: "Momentos de pausa, ejercicios simples, reflexiones que transforman el día a día.",
    },
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      setOnboarding({ completed: false, step: 1 });
      navigate("/onboarding/name");
    }
  };

  const current = slides[step];

  return (
    <PageContainer centered>
      <div className="text-center space-y-12 animate-fade-in">
        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-500",
                i === step
                  ? "bg-primary w-6"
                  : i < step
                  ? "bg-primary/50"
                  : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Content */}
        <div
          key={step}
          className="space-y-6 animate-slide-up"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-life-sage-light flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary animate-breathe" />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-primary uppercase tracking-wider">
              {current.title}
            </p>
            <h1 className="text-3xl font-serif text-foreground">
              {current.subtitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xs mx-auto">
              {current.body}
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="pt-8">
          <LifeButton onClick={handleNext} className="w-full">
            {step < slides.length - 1 ? "Continuar" : "Comenzar"}
          </LifeButton>
          
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-4 text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              Volver
            </button>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
