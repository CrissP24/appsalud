import { Home, Compass, BookOpen, MessageCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Inicio", path: "/home" },
  { icon: Compass, label: "Pilares", path: "/pillars" },
  { icon: BookOpen, label: "Diario", path: "/journal" },
  { icon: MessageCircle, label: "Comunidad", path: "/community" },
  { icon: User, label: "Perfil", path: "/profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 pb-safe">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex flex-col items-center justify-center px-4 py-2 transition-all duration-300",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 mb-1 transition-transform duration-300",
                    isActive && "scale-110"
                  )}
                />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
