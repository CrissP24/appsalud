import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { BottomNav } from "@/components/layout/BottomNav";
import { LifeButton } from "@/components/ui/LifeButton";
import { 
  getUser, 
  getTodayChecklist, 
  updateTodayChecklist,
  getCurrentDay,
  getPillarsProgress
} from "@/lib/storage";
import { PILLARS, DAILY_ANCHORS, GOOD_ACTIONS_SUGGESTIONS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Pause, Check, Sparkles, BookOpen, Heart } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const [checklist, setChecklist] = useState(getTodayChecklist());
  
  const user = getUser();
  const currentDay = getCurrentDay();
  const pillarsProgress = getPillarsProgress();
  
  // Get today's pillar (rotates through 12)
  const todayPillarIndex = (currentDay - 1) % 12;
  const todayPillar = PILLARS[todayPillarIndex];
  
  // Get today's anchor (rotates through anchors)
  const todayAnchorIndex = (currentDay - 1) % DAILY_ANCHORS.length;
  const todayAnchor = DAILY_ANCHORS[todayAnchorIndex];
  
  // Get today's good action
  const todayActionIndex = (currentDay - 1) % GOOD_ACTIONS_SUGGESTIONS.length;
  const todayGoodAction = GOOD_ACTIONS_SUGGESTIONS[todayActionIndex];

  // Calculate progress
  const completedPillars = Object.values(pillarsProgress).filter(Boolean).length;
  const totalChecked = [checklist.exercise, checklist.goodAction, checklist.journal].filter(Boolean).length;

  useEffect(() => {
    if (!user) {
      navigate("/onboarding");
    }
  }, [user, navigate]);

  const handleChecklistUpdate = (key: 'exercise' | 'goodAction' | 'journal') => {
    const newChecklist = { ...checklist, [key]: !checklist[key] };
    setChecklist(newChecklist);
    updateTodayChecklist({ [key]: newChecklist[key] });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageContainer>
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="space-y-1">
            <p className="text-muted-foreground">
              Día {currentDay}
            </p>
            <h1 className="text-3xl font-serif text-foreground">
              Hola, {user.name}
            </h1>
          </div>

          {/* Today's Anchor */}
          <div 
            className="life-card bg-gradient-to-br from-life-sage-light to-card cursor-pointer hover:shadow-md transition-all duration-300"
            onClick={() => setShowBreathingModal(true)}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-breathe">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-primary uppercase tracking-wider font-medium mb-1">
                  Ancla del día
                </p>
                <p className="text-foreground font-serif text-lg">
                  {todayAnchor}
                </p>
              </div>
            </div>
          </div>

          {/* Stop Button */}
          <LifeButton
            variant="anchor"
            onClick={() => setShowBreathingModal(true)}
            className="w-full flex items-center justify-center gap-3 py-5"
          >
            <Pause className="w-5 h-5" />
            Parar 30 segundos
          </LifeButton>

          {/* Today's Pillar */}
          <div 
            className="life-card cursor-pointer hover:shadow-md transition-all duration-300"
            onClick={() => navigate(`/pillars/${todayPillar.id}`)}
          >
            <p className="text-xs text-primary uppercase tracking-wider font-medium mb-2">
              Pilar de hoy
            </p>
            <h3 className="text-xl font-serif text-foreground mb-2">
              {todayPillar.name}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {todayPillar.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-primary">Ver ejercicio →</span>
              {pillarsProgress[todayPillar.id] && (
                <span className="text-xs bg-life-sage-light text-primary px-2 py-1 rounded-full">
                  Trabajado
                </span>
              )}
            </div>
          </div>

          {/* Daily Checklist */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif text-foreground">
                Prácticas del día
              </h2>
              <span className="text-sm text-muted-foreground">
                {totalChecked}/3
              </span>
            </div>

            <div className="space-y-3">
              {[
                { key: 'exercise' as const, label: 'Ejercicio consciente', icon: Sparkles, path: '/exercises' },
                { key: 'goodAction' as const, label: 'Buena acción', icon: Heart, sublabel: todayGoodAction },
                { key: 'journal' as const, label: 'Registro breve', icon: BookOpen, path: '/journal' },
              ].map(({ key, label, icon: Icon, sublabel, path }) => (
                <div
                  key={key}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                    checklist[key] ? "bg-life-sage-light" : "bg-card"
                  )}
                >
                  <button
                    onClick={() => handleChecklistUpdate(key)}
                    className={cn(
                      "w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300",
                      checklist[key]
                        ? "bg-primary border-primary"
                        : "border-border hover:border-primary"
                    )}
                  >
                    {checklist[key] && <Check className="w-4 h-4 text-primary-foreground" />}
                  </button>
                  
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => path && navigate(path)}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={cn(
                        "w-4 h-4",
                        checklist[key] ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className={cn(
                        "font-medium",
                        checklist[key] ? "text-primary" : "text-foreground"
                      )}>
                        {label}
                      </span>
                    </div>
                    {sublabel && (
                      <p className="text-sm text-muted-foreground mt-1 ml-6">
                        {sublabel}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="life-card bg-secondary/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Pilares trabajados</span>
              <span className="text-sm font-medium text-foreground">{completedPillars}/12</span>
            </div>
            <div className="flex gap-1">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.id}
                  className={cn(
                    "flex-1 h-2 rounded-full transition-all duration-300",
                    pillarsProgress[pillar.id] ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </PageContainer>

      {/* Breathing Modal */}
      {showBreathingModal && (
        <div 
          className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setShowBreathingModal(false)}
        >
          <div className="text-center space-y-8" onClick={e => e.stopPropagation()}>
            <div className="w-32 h-32 mx-auto rounded-full bg-life-sage-light flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary animate-breathe" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-serif text-foreground">
                Respirá
              </h2>
              <p className="text-muted-foreground max-w-xs mx-auto">
                Inhala... 4 segundos<br />
                Mantén... 4 segundos<br />
                Exhala... 4 segundos
              </p>
            </div>

            <p className="text-lg font-serif text-primary">
              {todayAnchor}
            </p>

            <LifeButton
              variant="secondary"
              onClick={() => setShowBreathingModal(false)}
            >
              Volver
            </LifeButton>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
