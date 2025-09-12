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
      <Header />

      <main>
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