import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

// SEO Meta Tags for 404 Page
const update404SEO = () => {
  document.title = "Page Not Found | Convo.wtf - The AI Agent Appstore";
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Page not found on Convo.wtf - The AI Agent Appstore. Return to the homepage to explore AI agents and marketplace features.');
  }
  
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  
  if (ogTitle) ogTitle.setAttribute('content', '404 Page Not Found | Convo.wtf');
  if (ogDescription) ogDescription.setAttribute('content', 'Page not found on Convo.wtf - The AI Agent Appstore. Return to the homepage to explore AI agents and marketplace features.');
  if (ogUrl) ogUrl.setAttribute('content', 'https://convo.wtf/404');
  
  const twitterTitle = document.querySelector('meta[property="twitter:title"]');
  const twitterDescription = document.querySelector('meta[property="twitter:description"]');
  const twitterUrl = document.querySelector('meta[property="twitter:url"]');
  
  if (twitterTitle) twitterTitle.setAttribute('content', '404 Page Not Found | Convo.wtf');
  if (twitterDescription) twitterDescription.setAttribute('content', 'Page not found on Convo.wtf - The AI Agent Appstore. Return to the homepage to explore AI agents and marketplace features.');
  if (twitterUrl) twitterUrl.setAttribute('content', 'https://convo.wtf/404');
  
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', 'https://convo.wtf/404');
};

export default function NotFound() {
  useEffect(() => {
    update404SEO();
  }, []);
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
