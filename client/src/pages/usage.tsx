import { useSession } from "@/lib/session-store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coins, Activity, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UsagePage() {
  const { usage, selectedModel, resetSession, isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h2 className="text-2xl font-bold">No Active Session</h2>
        <p className="text-muted-foreground">Please enter your API Key to see session usage.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Session Usage</h1>
        <Button variant="destructive" onClick={resetSession} size="sm">
          Clear Session & Key
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${usage.totalCost.toFixed(5)}</div>
            <p className="text-xs text-muted-foreground">
              Current Session
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requests</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usage.requestCount}</div>
            <p className="text-xs text-muted-foreground">
              Messages sent
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Model</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary truncate" title={selectedModel || ""}>
              {selectedModel}
            </div>
            <p className="text-xs text-muted-foreground">
              Standard Tier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokens</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(usage.inputTokens + usage.outputTokens).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {usage.inputTokens.toLocaleString()} in / {usage.outputTokens.toLocaleString()} out
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session Details</CardTitle>
          <CardDescription>
            This data is stored temporarily in your browser memory and will be lost on refresh.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-muted-foreground">Input Tokens Cost</span>
            <span className="font-mono text-sm">
              $
              {((usage.totalCost * (usage.inputTokens / (usage.inputTokens + usage.outputTokens || 1))) || 0).toFixed(5)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-muted-foreground">Output Tokens Cost</span>
            <span className="font-mono text-sm">
              $
              {((usage.totalCost * (usage.outputTokens / (usage.inputTokens + usage.outputTokens || 1))) || 0).toFixed(5)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}