import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { BottomNav } from "@/components/layout/BottomNav";
import { PILLARS } from "@/lib/data";
import { getPillarsProgress } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

export default function Pillars() {
  const navigate = useNavigate();
  const progress = getPillarsProgress();

  const completedCount = Object.values(progress).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageContainer>
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-serif text-foreground">
              Los 12 Pilares
            </h1>
            <p className="text-muted-foreground">
              Prácticas para cultivar conciencia. Sin orden, sin prisa.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary">
              <span>{completedCount} de 12 trabajados</span>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="space-y-3">
            {PILLARS.map((pillar, index) => (
              <button
                key={pillar.id}
                onClick={() => navigate(`/pillars/${pillar.id}`)}
                className={cn(
                  "w-full p-5 rounded-2xl text-left transition-all duration-300",
                  "border-2 hover:shadow-md",
                  progress[pillar.id]
                    ? "bg-life-sage-light border-primary/20"
                    : "bg-card border-transparent hover:border-border"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-300",
                    progress[pillar.id]
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {progress[pillar.id] ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground">
                      {pillar.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                      {pillar.description}
                    </p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground pt-4">
            Puedes volver a cualquier pilar cuando quieras
          </p>
        </div>
      </PageContainer>

      <BottomNav />
    </div>
  );
}
