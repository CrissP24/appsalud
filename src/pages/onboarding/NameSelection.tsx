import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { LifeButton } from "@/components/ui/LifeButton";
import { setOnboarding } from "@/lib/storage";

export default function NameSelection() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleContinue = () => {
    if (name.trim()) {
      // Store name temporarily, will save with intention
      sessionStorage.setItem("life_temp_name", name.trim());
      setOnboarding({ completed: false, step: 2 });
      navigate("/onboarding/intention");
    }
  };

  return (
    <PageContainer centered>
      <div className="space-y-12 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">
            Paso 1 de 2
          </p>
          <h1 className="text-3xl font-serif text-foreground">
            ¿Cómo te llamas?
          </h1>
          <p className="text-muted-foreground">
            O cómo te gustaría que te llamemos
          </p>
        </div>

        {/* Input */}
        <div className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="life-input text-center text-xl"
            autoFocus
          />
        </div>

        {/* Action */}
        <div className="pt-4">
          <LifeButton
            onClick={handleContinue}
            disabled={!name.trim()}
            className="w-full"
          >
            Continuar
          </LifeButton>
          
          <button
            onClick={() => navigate("/onboarding")}
            className="mt-4 w-full text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    </PageContainer>
  );
}
