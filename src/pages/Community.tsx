import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { BottomNav } from "@/components/layout/BottomNav";
import { LifeButton } from "@/components/ui/LifeButton";
import { 
  getForumPosts, 
  addForumPost,
  getChatMessages,
  addChatMessage,
  getUser
} from "@/lib/storage";
import { FORUM_TOPICS, REFERENT_MESSAGES } from "@/lib/data";
import type { ForumPost, ChatMessage } from "@/lib/types";
import { MessageCircle, Users, Send, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Community() {
  const user = getUser();
  const [activeTab, setActiveTab] = useState<'forum' | 'chat'>('forum');
  
  // Forum state
  const [posts, setPosts] = useState<ForumPost[]>(getForumPosts());
  const [newPost, setNewPost] = useState("");
  const todayTopicIndex = new Date().getDate() % FORUM_TOPICS.length;
  const todayTopic = FORUM_TOPICS[todayTopicIndex];

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>(getChatMessages());
  const [newMessage, setNewMessage] = useState("");

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;

    const post: ForumPost = {
      id: crypto.randomUUID(),
      author: user?.name || "Anónimo",
      text: newPost.trim(),
      timestamp: new Date().toISOString(),
      topic: todayTopic,
    };

    addForumPost(post);
    setPosts([...posts, post]);
    setNewPost("");
  };

  const handleMessageSubmit = () => {
    if (!newMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    addChatMessage(userMsg);
    setMessages(prev => [...prev, userMsg]);
    setNewMessage("");

    // Simulate referent response after a delay
    setTimeout(() => {
      const randomResponse = REFERENT_MESSAGES[Math.floor(Math.random() * REFERENT_MESSAGES.length)];
      const referentMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'referent',
        text: randomResponse,
        timestamp: new Date().toISOString(),
      };
      addChatMessage(referentMsg);
      setMessages(prev => [...prev, referentMsg]);
    }, 1500);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const todayPosts = posts.filter(p => p.topic === todayTopic);

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageContainer>
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-serif text-foreground">
              Comunidad
            </h1>
            <p className="text-muted-foreground">
              Un espacio de escucha y acompañamiento
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-muted rounded-xl">
            <button
              onClick={() => setActiveTab('forum')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300",
                activeTab === 'forum'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Users className="w-4 h-4" />
              <span>Foro</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300",
                activeTab === 'chat'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Acompañamiento</span>
            </button>
          </div>

          {/* Forum Tab */}
          {activeTab === 'forum' && (
            <div className="space-y-6">
              {/* Today's Topic */}
              <div className="life-card bg-life-sage-light">
                <p className="text-xs text-primary uppercase tracking-wider font-medium mb-2">
                  Tema del día
                </p>
                <p className="text-lg font-serif text-foreground">
                  {todayTopic}
                </p>
              </div>

              {/* Guidelines */}
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Respeto, escucha, sin exhibicionismo ni glorificación del exceso.
                </p>
              </div>

              {/* Post Input */}
              <div className="space-y-3">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Comparte tu reflexión..."
                  className="life-textarea"
                  rows={3}
                />
                <LifeButton
                  onClick={handlePostSubmit}
                  disabled={!newPost.trim()}
                  className="w-full"
                >
                  Compartir
                </LifeButton>
              </div>

              {/* Posts */}
              <div className="space-y-4">
                {todayPosts.length > 0 ? (
                  todayPosts.map((post) => (
                    <div key={post.id} className="life-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">
                          {post.author}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(post.timestamp)}
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {post.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-10 h-10 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">
                      Sé el primero en compartir hoy
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div className="space-y-4">
              {/* Info */}
              <div className="life-card bg-life-terracotta-light">
                <p className="text-sm text-life-warmth">
                  Este es un espacio de escucha. Tu referente está aquí para acompañarte, no para darte respuestas.
                </p>
              </div>

              {/* Messages */}
              <div className="space-y-3 min-h-[300px] max-h-[400px] overflow-y-auto">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <MessageCircle className="w-10 h-10 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">
                      Inicia una conversación
                    </p>
                  </div>
                )}
                
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "max-w-[80%] p-4 rounded-2xl",
                      msg.sender === 'user'
                        ? "ml-auto bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card rounded-bl-md"
                    )}
                  >
                    <p className={msg.sender === 'user' ? 'text-primary-foreground' : 'text-foreground'}>
                      {msg.text}
                    </p>
                    <p className={cn(
                      "text-xs mt-1",
                      msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    )}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleMessageSubmit()}
                  placeholder="Escribe un mensaje..."
                  className="life-input flex-1"
                />
                <LifeButton
                  onClick={handleMessageSubmit}
                  disabled={!newMessage.trim()}
                  className="px-4"
                >
                  <Send className="w-5 h-5" />
                </LifeButton>
              </div>
            </div>
          )}
        </div>
      </PageContainer>

      <BottomNav />
    </div>
  );
}
