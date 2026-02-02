import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { BarChart3, Home, Github, Calculator, MessageSquare, Coins } from "lucide-react";

export default function Sidebar() {
  const [location, setLocation] = useLocation();

  const handleViewRepo = () => {
    window.open("https://github.com/Sjs2332/ai-cost-calculator", "_blank");
  };

  const isActive = (path: string) => location === path;

  return (
    <div
      data-tour="sidebar"
      className="w-64 bg-card border-r border-border/60 flex flex-col h-screen hidden md:flex"
    >
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border/60">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-semibold text-foreground">AI Cost Calc</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        <Button
          data-tour="dashboard-nav"
          variant={isActive('/dashboard') ? "secondary" : "ghost"}
          className="w-full justify-start pl-[8px] pr-[8px]"
          size="sm"
          onClick={() => setLocation('/dashboard')}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="ml-3">Chat</span>
        </Button>

        <Button
          data-tour="usage-nav"
          variant={isActive('/usage') ? "secondary" : "ghost"}
          className="w-full justify-start pl-[8px] pr-[8px]"
          size="sm"
          onClick={() => setLocation('/usage')}
        >
          <Coins className="w-4 h-4" />
          <span className="ml-3">Cost</span>
        </Button>
      </nav>

      {/* View Repo - Desktop Only */}
      <div className="p-4 border-t border-border/60">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded-lg transition-colors duration-200 shadow-sm"
          size="sm"
          onClick={handleViewRepo}
        >
          <Github className="w-4 h-4 mr-2" />
          <span>View Repo</span>
        </Button>
      </div>
    </div>
  );
}