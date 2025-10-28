import { Link, useLocation } from "react-router-dom";
import { Cloud } from "lucide-react";
import { Button } from "./ui/button";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/model", label: "Model" },
    { path: "/predictions", label: "Predictions" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/case-studies", label: "Case Studies" },
    { path: "/testimonials", label: "Testimonials" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Cloud className="h-8 w-8 text-primary group-hover:animate-float" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              CloudyAI
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className={
                    isActive(item.path)
                      ? "bg-gradient-to-r from-primary to-primary-glow"
                      : "hover:text-primary"
                  }
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
