import { useState, useRef, useEffect } from "react";
import { useSession } from "@/lib/session-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Bot, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { calculateCost, PRICING_MODELS } from "@/lib/pricing-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ChatPage() {
  const { apiKey, selectedModel, setSelectedModel, trackUsage, isAuthenticated, messages, addMessage } = useSession();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !isAuthenticated || isLoading || !apiKey || !selectedModel) return;

    const userMessage = { role: 'user' as const, content: input };
    addMessage(userMessage);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      const assistantMessage = { role: 'assistant' as const, content: data.content };
      addMessage(assistantMessage);

      if (data.usage) {
        trackUsage(
          selectedModel,
          data.usage.prompt_tokens,
          data.usage.completion_tokens
        );

        const cost = calculateCost(selectedModel, data.usage.prompt_tokens, data.usage.completion_tokens);

        toast({
          description: `Usage: ${data.usage.total_tokens} tokens (~$${cost.toFixed(5)})`,
          duration: 3000,
        });
      }

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-card/50 backdrop-blur">
        <h1 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Chat Session</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:inline">Model:</span>
          <Select
            value={selectedModel || ""}
            onValueChange={setSelectedModel}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {PRICING_MODELS.map((model) => (
                <SelectItem key={model.id} value={model.id} className="text-xs">
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
            <Bot className="w-16 h-16 mb-4" />
            <p>Start a conversation with {selectedModel || "AI"}</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''
              }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}
            >
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div
              className={`rounded-lg p-4 max-w-[80%] ${msg.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground'
                }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isAuthenticated ? "Type a message..." : "Enter API key to start..."}
            disabled={isLoading || !isAuthenticated}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !isAuthenticated || !input.trim()}>
            <Send className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
        {!isAuthenticated && (
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-yellow-500">
            <AlertCircle className="w-3 h-3" />
            Please provide an API key to enable chat
          </div>
        )}
      </div>
    </div>
  );
}