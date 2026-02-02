import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider, useSession } from "@/lib/session-store";
import Layout from "@/components/layout";
import ChatPage from "@/pages/chat";
import UsagePage from "@/pages/usage";
import NotFound from "@/pages/not-found";
import ApiSetupModal from "@/components/api-setup-modal";
import { useEffect } from "react";

function Router() {
  const { isAuthenticated } = useSession();

  return (
    <Layout>
      <ApiSetupModal />
      <Switch>
        <Route path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/dashboard" component={ChatPage} />
        <Route path="/usage" component={UsagePage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Toaster />
          <Router />
        </div>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default App;
