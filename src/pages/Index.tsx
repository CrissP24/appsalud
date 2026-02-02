import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOnboarding, getQuestionnaire } from "@/lib/storage";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const onboarding = getOnboarding();
    const questionnaire = getQuestionnaire();

    if (!onboarding.completed) {
      navigate("/onboarding");
    } else if (!questionnaire.completed) {
      navigate("/questionnaire");
    } else {
      navigate("/home");
    }
  }, [navigate]);

  // Loading state while redirecting
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-16 h-16 rounded-full bg-life-sage-light flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-primary animate-breathe" />
      </div>
    </div>
  );
};

export default Index;
