import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { LifeButton } from "@/components/ui/LifeButton";
import { setOnboarding, setUser } from "@/lib/storage";
import { INTENTIONS } from "@/lib/data";
import type { Intention } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export default function IntentionSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Intention | null>(null);

  const handleContinue = () => {
    if (selected) {
      const name = sessionStorage.getItem("life_temp_name") || "Usuario";
      sessionStorage.removeItem("life_temp_name");
      
      setUser({
        id: crypto.randomUUID(),
        name,
        intention: selected,
        createdAt: new Date().toISOString(),
      });
      
      setOnboarding({ completed: true, step: 3 });
      navigate("/questionnaire");
    }
  };

  return (
    <PageContainer>
      <div className="space-y-10 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">
            Paso 2 de 2
          </p>
          <h1 className="text-3xl font-serif text-foreground">
            ¿Qué buscas cultivar?
          </h1>
          <p className="text-muted-foreground">
            Elige tu intención principal para este camino
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {INTENTIONS.map((intention) => (
            <button
              key={intention.id}
              onClick={() => setSelected(intention.id as Intention)}
              className={cn(
                "w-full p-5 rounded-2xl text-left transition-all duration-300 border-2",
                selected === intention.id
                  ? "bg-life-sage-light border-primary shadow-sm"
                  : "bg-card border-transparent hover:border-border"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground text-lg">
                    {intention.label}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {intention.description}
                  </p>
                </div>
                {selected === intention.id && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-fade-in">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Action */}
        <div className="pt-4">
          <LifeButton
            onClick={handleContinue}
            disabled={!selected}
            className="w-full"
          >
            Comenzar mi camino
          </LifeButton>
          
          <button
            onClick={() => navigate("/onboarding/name")}
            className="mt-4 w-full text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    </PageContainer>
  );
}
