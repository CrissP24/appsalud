import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { LifeButton } from "@/components/ui/LifeButton";
import { setQuestionnaire } from "@/lib/storage";
import { QUESTIONNAIRE_QUESTIONS } from "@/lib/data";
import type { AnchorType, AutomaticMoment, QuestionnaireResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Questionnaire() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<QuestionnaireResponse[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUESTIONNAIRE_QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONNAIRE_QUESTIONS.length) * 100;

  const currentResponse = responses.find(r => r.questionId === currentQuestion?.id);

  const handleSelect = (value: string) => {
    const newResponses = responses.filter(r => r.questionId !== currentQuestion.id);
    newResponses.push({ questionId: currentQuestion.id, answer: value });
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONNAIRE_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate results
      const anchorCounts: Record<string, number> = { digitales: 0, corporales: 0, sociales: 0 };
      const momentCounts: Record<string, number> = { mañana: 0, transiciones: 0, noche: 0 };

      responses.forEach(response => {
        const question = QUESTIONNAIRE_QUESTIONS.find(q => q.id === response.questionId);
        if (question) {
          const option = question.options.find(o => o.value === response.answer);
          if (option?.anchor) {
            anchorCounts[option.anchor]++;
          }
          if (['morning-1', 'morning-2'].includes(question.id)) {
            momentCounts.mañana++;
          } else if (['transitions-1', 'transitions-2'].includes(question.id)) {
            momentCounts.transiciones++;
          } else if (['night-1', 'night-2'].includes(question.id)) {
            momentCounts.noche++;
          }
        }
      });

      const sortedAnchors = Object.entries(anchorCounts)
        .sort(([, a], [, b]) => b - a)
        .filter(([, count]) => count > 0)
        .slice(0, 2)
        .map(([key]) => key as AnchorType);

      const sortedMoments = Object.entries(momentCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([key]) => key as AutomaticMoment);

      setQuestionnaire({
        completed: true,
        responses,
        anchors: sortedAnchors.length > 0 ? sortedAnchors : ['corporales'],
        automaticMoments: sortedMoments.length > 0 ? sortedMoments : ['mañana'],
      });

      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (showResults) {
    const result = {
      anchors: ['corporales', 'digitales'] as AnchorType[],
      moments: ['mañana', 'transiciones'] as AutomaticMoment[],
    };

    // Get actual results from storage
    const stored = localStorage.getItem('life_questionnaire');
    if (stored) {
      const parsed = JSON.parse(stored);
      result.anchors = parsed.anchors || result.anchors;
      result.moments = parsed.automaticMoments || result.moments;
    }

    return (
      <PageContainer centered>
        <div className="space-y-10 animate-fade-in text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-life-sage-light flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary" />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-serif text-foreground">
              Tu mapa de hábitos
            </h1>
            <p className="text-muted-foreground">
              Esto es lo que observamos, sin juicios
            </p>
          </div>

          <div className="space-y-6 text-left">
            <div className="life-card">
              <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
                Tus anclas principales
              </p>
              <p className="text-lg text-foreground">
                {result.anchors.join(' y ')}
              </p>
            </div>

            <div className="life-card">
              <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
                Momentos más automáticos
              </p>
              <p className="text-lg text-foreground">
                {result.moments.join(' y ')}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            No hay buenos ni malos resultados. Solo puntos de partida.
          </p>

          <LifeButton onClick={() => navigate("/home")} className="w-full">
            Ir a mi espacio
          </LifeButton>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-8 animate-fade-in">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Mapa de hábitos</span>
            <span>{currentIndex + 1} de {QUESTIONNAIRE_QUESTIONS.length}</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div key={currentQuestion.id} className="space-y-6 animate-slide-up">
          <div className="space-y-2">
            <p className="text-xs text-primary uppercase tracking-wider font-medium">
              {currentQuestion.category}
            </p>
            <h2 className="text-2xl font-serif text-foreground">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "w-full p-4 rounded-xl text-left transition-all duration-300 border-2",
                  currentResponse?.answer === option.value
                    ? "bg-life-sage-light border-primary"
                    : "bg-card border-transparent hover:border-border"
                )}
              >
                <span className="text-foreground">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 pt-4">
          <LifeButton
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex-1"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Anterior
          </LifeButton>
          <LifeButton
            onClick={handleNext}
            disabled={!currentResponse}
            className="flex-1"
          >
            {currentIndex === QUESTIONNAIRE_QUESTIONS.length - 1 ? "Ver resultados" : "Siguiente"}
            {currentIndex < QUESTIONNAIRE_QUESTIONS.length - 1 && <ChevronRight className="w-5 h-5 ml-1" />}
          </LifeButton>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="w-full text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          Completar después
        </button>
      </div>
    </PageContainer>
  );
}
