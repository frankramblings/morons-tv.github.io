import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Browse from "@/pages/browse";
import Video from "@/pages/video";
import MostMoronic from "@/pages/most-moronic";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/browse" component={Browse} />
      <Route path="/video/:id" component={Video} />
      <Route path="/most-moronic" component={MostMoronic} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-[#F9F7F0]">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
