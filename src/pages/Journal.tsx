import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { BottomNav } from "@/components/layout/BottomNav";
import { LifeButton } from "@/components/ui/LifeButton";
import { 
  getJournalEntries, 
  addJournalEntry, 
  updateTodayChecklist 
} from "@/lib/storage";
import type { JournalEntry } from "@/lib/types";
import { BookOpen, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(getJournalEntries());
  const [isWriting, setIsWriting] = useState(false);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  
  const [feeling, setFeeling] = useState("");
  const [observation, setObservation] = useState("");
  const [gratitude, setGratitude] = useState("");

  const today = new Date().toISOString().split('T')[0];
  const todayEntry = entries.find(e => e.date === today);

  const handleSave = () => {
    if (!feeling.trim() && !observation.trim() && !gratitude.trim()) return;

    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      date: today,
      feeling: feeling.trim(),
      observation: observation.trim(),
      gratitude: gratitude.trim(),
    };

    addJournalEntry(entry);
    setEntries([...entries, entry]);
    updateTodayChecklist({ journal: true });
    
    setFeeling("");
    setObservation("");
    setGratitude("");
    setIsWriting(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageContainer>
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-serif text-foreground">
              Diario
            </h1>
            <p className="text-muted-foreground">
              Un espacio para observar sin juzgar
            </p>
          </div>

          {/* Today's Entry or New Entry Button */}
          {!isWriting && !todayEntry && (
            <LifeButton
              onClick={() => setIsWriting(true)}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Escribir entrada de hoy
            </LifeButton>
          )}

          {todayEntry && !isWriting && (
            <div className="life-card bg-life-sage-light">
              <div className="flex items-center gap-2 text-primary mb-3">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Ya escribiste hoy</span>
              </div>
              <p className="text-foreground text-sm line-clamp-2">
                {todayEntry.feeling || todayEntry.observation || todayEntry.gratitude}
              </p>
            </div>
          )}

          {/* Writing Form */}
          {isWriting && (
            <div className="space-y-6 animate-slide-up">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">
                    ¿Cómo estuviste hoy?
                  </label>
                  <textarea
                    value={feeling}
                    onChange={(e) => setFeeling(e.target.value)}
                    placeholder="Sin juzgar, solo notando..."
                    className="life-textarea"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">
                    ¿Qué observaste?
                  </label>
                  <textarea
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    placeholder="Patrones, momentos, sensaciones..."
                    className="life-textarea"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">
                    ¿Qué agradeces?
                  </label>
                  <textarea
                    value={gratitude}
                    onChange={(e) => setGratitude(e.target.value)}
                    placeholder="Algo pequeño o grande..."
                    className="life-textarea"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <LifeButton
                  variant="secondary"
                  onClick={() => setIsWriting(false)}
                  className="flex-1"
                >
                  Cancelar
                </LifeButton>
                <LifeButton
                  onClick={handleSave}
                  disabled={!feeling.trim() && !observation.trim() && !gratitude.trim()}
                  className="flex-1"
                >
                  Guardar
                </LifeButton>
              </div>
            </div>
          )}

          {/* Previous Entries */}
          {sortedEntries.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-serif text-foreground">
                Entradas anteriores
              </h2>
              
              <div className="space-y-3">
                {sortedEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="life-card cursor-pointer"
                    onClick={() => setExpandedEntry(
                      expandedEntry === entry.id ? null : entry.id
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-primary font-medium capitalize">
                        {formatDate(entry.date)}
                      </p>
                      {expandedEntry === entry.id ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    
                    {expandedEntry === entry.id ? (
                      <div className="mt-4 space-y-4 animate-fade-in">
                        {entry.feeling && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Cómo estuve</p>
                            <p className="text-foreground">{entry.feeling}</p>
                          </div>
                        )}
                        {entry.observation && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Qué observé</p>
                            <p className="text-foreground">{entry.observation}</p>
                          </div>
                        )}
                        {entry.gratitude && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Agradecimiento</p>
                            <p className="text-foreground">{entry.gratitude}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm mt-2 line-clamp-1">
                        {entry.feeling || entry.observation || entry.gratitude}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {entries.length === 0 && !isWriting && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                Aún no hay entradas.<br />
                Comienza tu diario hoy.
              </p>
            </div>
          )}
        </div>
      </PageContainer>

      <BottomNav />
    </div>
  );
}
