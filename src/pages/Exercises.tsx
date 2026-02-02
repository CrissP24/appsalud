import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { BottomNav } from "@/components/layout/BottomNav";
import { LifeButton } from "@/components/ui/LifeButton";
import { EXERCISES } from "@/lib/data";
import { updateTodayChecklist } from "@/lib/storage";
import { ArrowLeft, Clock, Wind, Activity, Footprints, Coffee, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Exercise } from "@/lib/types";

const typeIcons = {
  respiracion: Wind,
  cuerpo: Activity,
  movimiento: Footprints,
  pausa: Coffee,
};

const typeColors = {
  respiracion: "bg-blue-50 text-blue-600",
  cuerpo: "bg-green-50 text-green-600",
  movimiento: "bg-orange-50 text-orange-600",
  pausa: "bg-purple-50 text-purple-600",
};

export default function Exercises() {
  const navigate = useNavigate();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    updateTodayChecklist({ exercise: true });
    setTimeout(() => {
      setSelectedExercise(null);
      setIsCompleted(false);
    }, 1500);
  };

  if (selectedExercise) {
    const Icon = typeIcons[selectedExercise.type];
    
    return (
      <div className="min-h-screen bg-background">
        <PageContainer>
          <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <button
              onClick={() => setSelectedExercise(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>

            {/* Exercise Details */}
            <div className="text-center space-y-4">
              <div className={cn(
                "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center",
                typeColors[selectedExercise.type]
              )}>
                <Icon className="w-8 h-8" />
              </div>
              
              <div>
                <h1 className="text-2xl font-serif text-foreground">
                  {selectedExercise.name}
                </h1>
                <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedExercise.duration}</span>
                </div>
              </div>

              <p className="text-muted-foreground">
                {selectedExercise.description}
              </p>
            </div>

            {/* Steps */}
            <div className="life-card space-y-4">
              <p className="text-xs text-primary uppercase tracking-wider font-medium">
                Instrucciones
              </p>
              <ol className="space-y-4">
                {selectedExercise.steps.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-foreground pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Complete Button */}
            <div className="pt-4">
              {!isCompleted ? (
                <LifeButton onClick={handleComplete} className="w-full">
                  Completar ejercicio
                </LifeButton>
              ) : (
                <div className="flex items-center justify-center gap-2 text-primary py-4 animate-fade-in">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">¡Ejercicio completado!</span>
                </div>
              )}
            </div>
          </div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageContainer>
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>

          <div className="space-y-2">
            <h1 className="text-3xl font-serif text-foreground">
              Ejercicios
            </h1>
            <p className="text-muted-foreground">
              Prácticas cortas para reconectarte con el momento
            </p>
          </div>

          {/* Exercises Grid */}
          <div className="space-y-3">
            {EXERCISES.map((exercise) => {
              const Icon = typeIcons[exercise.type];
              return (
                <button
                  key={exercise.id}
                  onClick={() => setSelectedExercise(exercise)}
                  className="w-full p-5 rounded-2xl text-left bg-card border-2 border-transparent hover:border-border transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      typeColors[exercise.type]
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">
                        {exercise.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{exercise.duration}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </PageContainer>

      <BottomNav />
    </div>
  );
}
