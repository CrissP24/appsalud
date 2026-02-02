import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { BottomNav } from "@/components/layout/BottomNav";
import { LifeButton } from "@/components/ui/LifeButton";
import { 
  getUser, 
  getAnchors, 
  setAnchors, 
  getCurrentDay,
  getPillarsProgress,
  getJournalEntries,
  resetAllData
} from "@/lib/storage";
import { INTENTIONS } from "@/lib/data";
import type { AnchorSettings } from "@/lib/types";
import { User, Bell, RotateCcw, ChevronRight, Calendar, BookOpen, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Profile() {
  const navigate = useNavigate();
  const user = getUser();
  const [anchorSettings, setAnchorSettings] = useState<AnchorSettings>(getAnchors());
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const currentDay = getCurrentDay();
  const pillarsProgress = getPillarsProgress();
  const journalEntries = getJournalEntries();
  
  const completedPillars = Object.values(pillarsProgress).filter(Boolean).length;
  const intention = INTENTIONS.find(i => i.id === user?.intention);

  const handleAnchorToggle = (key: keyof AnchorSettings) => {
    const newSettings = { ...anchorSettings, [key]: !anchorSettings[key] };
    setAnchorSettings(newSettings);
    setAnchors(newSettings);
  };

  const handleReset = () => {
    resetAllData();
    navigate("/onboarding");
  };

  if (!user) {
    navigate("/onboarding");
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageContainer>
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-life-sage-light flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-serif text-foreground">
                {user.name}
              </h1>
              <p className="text-muted-foreground">
                Intención: {intention?.label}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="life-card text-center">
              <Calendar className="w-5 h-5 mx-auto text-primary mb-2" />
              <p className="text-2xl font-serif text-foreground">{currentDay}</p>
              <p className="text-xs text-muted-foreground">Días</p>
            </div>
            <div className="life-card text-center">
              <Compass className="w-5 h-5 mx-auto text-primary mb-2" />
              <p className="text-2xl font-serif text-foreground">{completedPillars}</p>
              <p className="text-xs text-muted-foreground">Pilares</p>
            </div>
            <div className="life-card text-center">
              <BookOpen className="w-5 h-5 mx-auto text-primary mb-2" />
              <p className="text-2xl font-serif text-foreground">{journalEntries.length}</p>
              <p className="text-xs text-muted-foreground">Entradas</p>
            </div>
          </div>

          {/* Anchor Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-serif text-foreground">
                Anclas de conciencia
              </h2>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Momentos del día donde recibirás recordatorios para pausar
            </p>

            <div className="space-y-3">
              {[
                { key: 'morning' as const, label: 'Mañana', time: 'Al despertar' },
                { key: 'transitions' as const, label: 'Transiciones', time: 'Entre actividades' },
                { key: 'night' as const, label: 'Noche', time: 'Antes de dormir' },
              ].map(({ key, label, time }) => (
                <button
                  key={key}
                  onClick={() => handleAnchorToggle(key)}
                  className={cn(
                    "w-full p-4 rounded-xl flex items-center justify-between transition-all duration-300",
                    anchorSettings[key]
                      ? "bg-life-sage-light"
                      : "bg-card"
                  )}
                >
                  <div className="text-left">
                    <p className="font-medium text-foreground">{label}</p>
                    <p className="text-sm text-muted-foreground">{time}</p>
                  </div>
                  <div className={cn(
                    "w-12 h-7 rounded-full transition-all duration-300 relative",
                    anchorSettings[key] ? "bg-primary" : "bg-muted"
                  )}>
                    <div className={cn(
                      "absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all duration-300",
                      anchorSettings[key] ? "left-6" : "left-1"
                    )} />
                  </div>
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Los recordatorios se simularán en esta versión
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/questionnaire")}
              className="w-full p-4 rounded-xl bg-card flex items-center justify-between hover:bg-muted transition-colors"
            >
              <span className="text-foreground">Repetir cuestionario inicial</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Reset */}
          <div className="pt-4">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full flex items-center justify-center gap-2 text-destructive py-3 hover:bg-destructive/10 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar todo</span>
              </button>
            ) : (
              <div className="space-y-3 p-4 bg-destructive/10 rounded-xl">
                <p className="text-sm text-center text-foreground">
                  ¿Estás seguro? Esto borrará todo tu progreso.
                </p>
                <div className="flex gap-3">
                  <LifeButton
                    variant="secondary"
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </LifeButton>
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-destructive text-destructive-foreground rounded-full py-3 font-medium"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageContainer>

      <BottomNav />
    </div>
  );
}
