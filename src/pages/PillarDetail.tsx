import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { LifeButton } from "@/components/ui/LifeButton";
import { PILLARS } from "@/lib/data";
import { getPillarsProgress, setPillarCompleted } from "@/lib/storage";
import { ArrowLeft, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PillarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pillarId = parseInt(id || "1");
  const pillar = PILLARS.find(p => p.id === pillarId);
  
  const [isCompleted, setIsCompleted] = useState(getPillarsProgress()[pillarId] || false);
  const [showCelebration, setShowCelebration] = useState(false);

  if (!pillar) {
    navigate("/pillars");
    return null;
  }

  const handleComplete = () => {
    setPillarCompleted(pillarId, true);
    setIsCompleted(true);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  };

  const handleReset = () => {
    setPillarCompleted(pillarId, false);
    setIsCompleted(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageContainer>
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <button
            onClick={() => navigate("/pillars")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver a pilares</span>
          </button>

          {/* Pillar Number */}
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-medium transition-all duration-300",
            isCompleted
              ? "bg-primary text-primary-foreground"
              : "bg-life-sage-light text-primary"
          )}>
            {isCompleted ? <Check className="w-8 h-8" /> : pillar.id}
          </div>

          {/* Title & Description */}
          <div className="space-y-4">
            <h1 className="text-3xl font-serif text-foreground">
              {pillar.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {pillar.description}
            </p>
          </div>

          {/* Exercise */}
          <div className="life-card space-y-4">
            <div>
              <p className="text-xs text-primary uppercase tracking-wider font-medium mb-2">
                Ejercicio práctico
              </p>
              <p className="text-foreground leading-relaxed">
                {pillar.exercise}
              </p>
            </div>
          </div>

          {/* Real Action */}
          <div className="life-card bg-life-terracotta-light space-y-4">
            <div>
              <p className="text-xs text-life-terracotta uppercase tracking-wider font-medium mb-2">
                Acción en la vida real
              </p>
              <p className="text-foreground leading-relaxed">
                {pillar.realAction}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4">
            {!isCompleted ? (
              <LifeButton onClick={handleComplete} className="w-full">
                Marcar como trabajado
              </LifeButton>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-primary py-3">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Pilar trabajado</span>
                </div>
                <LifeButton
                  variant="secondary"
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Volver a practicar
                </LifeButton>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-3 pt-4">
            {pillarId > 1 && (
              <LifeButton
                variant="ghost"
                onClick={() => navigate(`/pillars/${pillarId - 1}`)}
                className="flex-1"
              >
                ← Anterior
              </LifeButton>
            )}
            {pillarId < 12 && (
              <LifeButton
                variant="ghost"
                onClick={() => navigate(`/pillars/${pillarId + 1}`)}
                className="flex-1"
              >
                Siguiente →
              </LifeButton>
            )}
          </div>
        </div>
      </PageContainer>

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 bg-primary/10 flex items-center justify-center z-50 animate-fade-in">
          <div className="text-center space-y-4 animate-slide-up">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary flex items-center justify-center">
              <Check className="w-10 h-10 text-primary-foreground" />
            </div>
            <p className="text-xl font-serif text-foreground">
              ¡Bien hecho!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
