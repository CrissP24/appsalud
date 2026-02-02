// LocalStorage service for LIFE app

import type { 
  User, 
  OnboardingState, 
  QuestionnaireResult, 
  DailyChecklist,
  AnchorSettings,
  GoodAction,
  JournalEntry,
  ChatMessage,
  ForumPost,
  AppState
} from './types';

const STORAGE_KEYS = {
  USER: 'life_user',
  ONBOARDING: 'life_onboarding',
  QUESTIONNAIRE: 'life_questionnaire',
  DAILY_CHECKLISTS: 'life_daily_checklists',
  PILLARS_PROGRESS: 'life_pillars_progress',
  ANCHORS: 'life_anchors',
  GOOD_ACTIONS: 'life_good_actions',
  JOURNAL: 'life_journal',
  CHAT: 'life_chat',
  FORUM: 'life_forum',
  CURRENT_DAY: 'life_current_day',
} as const;

// Generic helpers
function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

// User
export function getUser(): User | null {
  return getItem<User | null>(STORAGE_KEYS.USER, null);
}

export function setUser(user: User): void {
  setItem(STORAGE_KEYS.USER, user);
}

// Onboarding
export function getOnboarding(): OnboardingState {
  return getItem<OnboardingState>(STORAGE_KEYS.ONBOARDING, { completed: false, step: 0 });
}

export function setOnboarding(state: OnboardingState): void {
  setItem(STORAGE_KEYS.ONBOARDING, state);
}

// Questionnaire
export function getQuestionnaire(): QuestionnaireResult {
  return getItem<QuestionnaireResult>(STORAGE_KEYS.QUESTIONNAIRE, {
    completed: false,
    responses: [],
    anchors: [],
    automaticMoments: [],
  });
}

export function setQuestionnaire(result: QuestionnaireResult): void {
  setItem(STORAGE_KEYS.QUESTIONNAIRE, result);
}

// Daily Checklists
export function getDailyChecklists(): DailyChecklist[] {
  return getItem<DailyChecklist[]>(STORAGE_KEYS.DAILY_CHECKLISTS, []);
}

export function setDailyChecklists(checklists: DailyChecklist[]): void {
  setItem(STORAGE_KEYS.DAILY_CHECKLISTS, checklists);
}

export function getTodayChecklist(): DailyChecklist {
  const today = new Date().toISOString().split('T')[0];
  const checklists = getDailyChecklists();
  const existing = checklists.find(c => c.date === today);
  
  if (existing) return existing;
  
  const newChecklist: DailyChecklist = {
    date: today,
    exercise: false,
    goodAction: false,
    journal: false,
  };
  
  setDailyChecklists([...checklists, newChecklist]);
  return newChecklist;
}

export function updateTodayChecklist(updates: Partial<DailyChecklist>): void {
  const today = new Date().toISOString().split('T')[0];
  const checklists = getDailyChecklists();
  const index = checklists.findIndex(c => c.date === today);
  
  if (index >= 0) {
    checklists[index] = { ...checklists[index], ...updates };
  } else {
    checklists.push({
      date: today,
      exercise: false,
      goodAction: false,
      journal: false,
      ...updates,
    });
  }
  
  setDailyChecklists(checklists);
}

// Pillars Progress
export function getPillarsProgress(): { [key: number]: boolean } {
  return getItem<{ [key: number]: boolean }>(STORAGE_KEYS.PILLARS_PROGRESS, {});
}

export function setPillarCompleted(pillarId: number, completed: boolean): void {
  const progress = getPillarsProgress();
  progress[pillarId] = completed;
  setItem(STORAGE_KEYS.PILLARS_PROGRESS, progress);
}

// Anchors
export function getAnchors(): AnchorSettings {
  return getItem<AnchorSettings>(STORAGE_KEYS.ANCHORS, {
    morning: true,
    transitions: true,
    night: true,
  });
}

export function setAnchors(settings: AnchorSettings): void {
  setItem(STORAGE_KEYS.ANCHORS, settings);
}

// Good Actions
export function getGoodActions(): GoodAction[] {
  return getItem<GoodAction[]>(STORAGE_KEYS.GOOD_ACTIONS, []);
}

export function addGoodAction(action: GoodAction): void {
  const actions = getGoodActions();
  setItem(STORAGE_KEYS.GOOD_ACTIONS, [...actions, action]);
}

export function completeGoodAction(id: string): void {
  const actions = getGoodActions();
  const updated = actions.map(a => a.id === id ? { ...a, completed: true } : a);
  setItem(STORAGE_KEYS.GOOD_ACTIONS, updated);
}

// Journal
export function getJournalEntries(): JournalEntry[] {
  return getItem<JournalEntry[]>(STORAGE_KEYS.JOURNAL, []);
}

export function addJournalEntry(entry: JournalEntry): void {
  const entries = getJournalEntries();
  setItem(STORAGE_KEYS.JOURNAL, [...entries, entry]);
}

// Chat
export function getChatMessages(): ChatMessage[] {
  return getItem<ChatMessage[]>(STORAGE_KEYS.CHAT, []);
}

export function addChatMessage(message: ChatMessage): void {
  const messages = getChatMessages();
  setItem(STORAGE_KEYS.CHAT, [...messages, message]);
}

// Forum
export function getForumPosts(): ForumPost[] {
  return getItem<ForumPost[]>(STORAGE_KEYS.FORUM, []);
}

export function addForumPost(post: ForumPost): void {
  const posts = getForumPosts();
  setItem(STORAGE_KEYS.FORUM, [...posts, post]);
}

// Current Day Counter
export function getCurrentDay(): number {
  return getItem<number>(STORAGE_KEYS.CURRENT_DAY, 1);
}

export function incrementDay(): void {
  const current = getCurrentDay();
  setItem(STORAGE_KEYS.CURRENT_DAY, current + 1);
}

// Reset all data
export function resetAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

// Get full app state
export function getFullAppState(): AppState {
  return {
    user: getUser(),
    onboarding: getOnboarding(),
    questionnaire: getQuestionnaire(),
    dailyChecklists: getDailyChecklists(),
    pillarsProgress: getPillarsProgress(),
    anchors: getAnchors(),
    goodActions: getGoodActions(),
    journalEntries: getJournalEntries(),
    chatMessages: getChatMessages(),
    forumPosts: getForumPosts(),
    currentDay: getCurrentDay(),
  };
}
