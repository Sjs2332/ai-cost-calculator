import Sidebar from "./sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
}