import { Contribute } from "./components/sections/Contribute";
import { ContextCost } from "./components/sections/ContextCost";
import { DesignDecisions } from "./components/sections/DesignDecisions";
import { Faq } from "./components/sections/Faq";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/sections/Hero";
import { Playground } from "./components/sections/Playground";
import { QuickStart } from "./components/sections/QuickStart";
import { Solution } from "./components/sections/Solution";
import { TokenEconomics } from "./components/sections/TokenEconomics";
import { UseCases } from "./components/sections/UseCases";

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="absolute inset-0 -z-10 size-full bg-background">
        <div className="absolute right-0 top-0 size-[500px] translate-x-[-20%] translate-y-[20%] rounded-full bg-primary/20 opacity-50 blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 size-[500px] translate-x-[20%] translate-y-[-10%] rounded-full bg-secondary opacity-50 blur-[80px]"></div>
      </div>

      <Header />

      <main className="container mx-auto max-w-5xl px-4">
        <Hero />
        <ContextCost />
        <Solution />
        <TokenEconomics />
        <Playground />
        <QuickStart />
        <Faq />
        <DesignDecisions />
        <UseCases />
        <Contribute />
      </main>

      <Footer />
    </div>
  );
}