// LIFE App Types

export interface User {
  id: string;
  name: string;
  intention: Intention;
  createdAt: string;
}

export type Intention = 'presencia' | 'calma' | 'claridad' | 'vinculos' | 'orden';

export interface OnboardingState {
  completed: boolean;
  step: number;
}

export interface QuestionnaireResponse {
  questionId: string;
  answer: string;
}

export interface QuestionnaireResult {
  completed: boolean;
  responses: QuestionnaireResponse[];
  anchors: AnchorType[];
  automaticMoments: AutomaticMoment[];
}

export type AnchorType = 'corporales' | 'digitales' | 'sociales';
export type AutomaticMoment = 'mañana' | 'transiciones' | 'noche';

export interface DailyChecklist {
  date: string;
  exercise: boolean;
  goodAction: boolean;
  journal: boolean;
}

export interface Pillar {
  id: number;
  name: string;
  description: string;
  exercise: string;
  realAction: string;
  completed: boolean;
  completedDates: string[];
}

export interface AnchorSettings {
  morning: boolean;
  transitions: boolean;
  night: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  duration: string;
  description: string;
  steps: string[];
  type: 'respiracion' | 'cuerpo' | 'movimiento' | 'pausa';
}

export interface GoodAction {
  id: string;
  text: string;
  completed: boolean;
  date: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  feeling: string;
  observation: string;
  gratitude: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'referent';
  text: string;
  timestamp: string;
}

export interface ForumPost {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  topic: string;
}

export interface AppState {
  user: User | null;
  onboarding: OnboardingState;
  questionnaire: QuestionnaireResult;
  dailyChecklists: DailyChecklist[];
  pillarsProgress: { [key: number]: boolean };
  anchors: AnchorSettings;
  goodActions: GoodAction[];
  journalEntries: JournalEntry[];
  chatMessages: ChatMessage[];
  forumPosts: ForumPost[];
  currentDay: number;
}
