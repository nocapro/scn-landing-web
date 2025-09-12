import {
  Box,
  BrainCircuit,
  GitMerge,
  Hash,
  Network,
  Puzzle,
  Scissors,
  SlidersHorizontal,
  Smile,
  Workflow,
  Zap,
} from "lucide-react";
import { InlineCode } from "@/components/InlineCode";

export const contextCostContent = {
  title: "The High Cost of Context",
  subtitle:
    "LLMs are powerful, but their attention is expensive and limited. Traditional methods of providing context just don&apos;t scale.",
  cards: [
    {
      icon: Zap,
      title: "Token Limits",
      content: (
        <>
          Context windows are tiny. Pasting <InlineCode>/src</InlineCode>{" "}
          consumes your entire budget before you&apos;ve even asked a question.
        </>
      ),
    },
    {
      icon: BrainCircuit,
      title: "Signal vs. Noise",
      content: (
        <>
          Models don&apos;t need semicolons, they need the dependency graph—what
          talks to what, and who calls whom.
        </>
      ),
    },
    {
      icon: Workflow,
      title: "Broken Workflow",
      content: (
        <>
          You don&apos;t need another IDE. You need a 1-second command that
          turns{" "}
          <em>“here’s my repo”</em> into <em>“here’s the summary”</em>.
        </>
      ),
    },
  ],
};

export const solutionContent = {
  title: "The Solution: Symbolic Context Notation",
  subtitle:
    "A zero-config, WASM-powered static analyzer that spits out a dense, emoji-rich, token-counted summary of your project.",
  cliCommand: `npx scn "src/**/*.{ts,tsx}" --exclude="**/*.test.ts" --preset=compact`,
  exampleOutput: `§1 src/main.tsx
  + ◇ App (1)
  + ~ fetchUsers (2)
    > 2, 3

§2 src/services/api.ts
  ~ getUser (1) ...!
    < 1
    > 3

§3 src/types.ts
  + {} User (1)
    + @ id: #string
    + @ name: #string`,
  legend: [
    { symbol: "§", meaning: "File header (id + path)" },
    { symbol: "+ / -", meaning: "Exported / Private symbol" },
    { symbol: "◇ ~ {}", meaning: "Class, Function, Interface, JSX element" },
    { symbol: "> / <", meaning: "Outgoing / Incoming call or import" },
    { symbol: "... ! o", meaning: "Async, Throws, Pure function" },
  ],
};

export const tokenEconomicsContent = {
  title: "Token Economics",
  subtitle: "Fit 10x more context into every prompt.",
  table: [
    { representation: "Raw Source", tokens: "18,700", window: "467% ❌" },
    { representation: "Minified", tokens: "12,100", window: "302% ❌" },
    { representation: "AST JSON", tokens: "9,400", window: "235% ❌" },
    {
      representation: "SCN Compact",
      tokens: "380",
      window: "9% ✅",
      highlight: true,
    },
  ],
};

export const playgroundContent = {
  title: "Live Demo Playground",
  subtitle:
    "Drag-and-drop a folder, move the slider, and watch the map re-shape in real time.",
  buttonText: "Try the Playground",
};

export const quickStartContent = {
  title: "CLI Quick Start",
  subtitle: "Get started in under a minute.",
  code: `# global install
npm i -g scn            # or yarn/pnpm/bun

# basic
scn "src/**/*.{ts,tsx}" --output map.scn

# monorepo
scn "apps/*/src/**/*" --exclude="**/*.stories.tsx" --max-workers=8

# watch mode
scn "src/**/*" --watch --preset=minimal`,
};

export const faqContent = {
  title: "Frequently Asked Questions",
  questions: [
    {
      question: "Does GPT really understand the icons?",
      answer:
        "Yes. They are single Unicode chars and appear thousands of times in training data (Unicode chess, cards, etc.).",
    },
    {
      question: (
        <>
          Why not just <InlineCode>ctags</InlineCode> +{" "}
          <InlineCode>grep</InlineCode>?
        </>
      ),
      answer:
        "ctags is per-file, has no concept of cross-file edges, offers no token counting, and has no browser-based playground.",
    },
    {
      question: "What happens when a language adds new syntax?",
      answer:
        "Only if the underlying tree-sitter grammar breaks, which is usually fixed upstream within days. Our queries are tiny and easy to patch.",
    },
    {
      question: "Is my proprietary code safe?",
      answer:
        "Everything runs locally on your machine. The WASM is loaded from your domain; there is no telemetry and no cloud dependency.",
    },
  ],
};

export const designDecisionsContent = {
  title: "Design Decisions",
  subtitle:
    "Built on a foundation of modern, performant, and portable technologies.",
  cards: [
    {
      icon: GitMerge,
      title: "tree-sitter",
      content: "Incremental, error-tolerant, multi-language parsing.",
    },
    {
      icon: Box,
      title: "WASM",
      content: "Same binary runs in browser, edge, or server.",
    },
    {
      icon: Puzzle,
      title: "No Bundler Magic",
      content: (
        <>
          ES modules only, <InlineCode>?module</InlineCode> CDN link works.
        </>
      ),
    },
    {
      icon: Scissors,
      title: "No AST Dump",
      content: (
        <>
          We throw away <em>statements</em> and keep <em>symbols + edges</em>.
        </>
      ),
    },
    {
      icon: Network,
      title: "Topological Sort",
      content: "GPT sees bottom-up dependencies, which reduces hallucination.",
    },
    {
      icon: Smile,
      title: "Stable Icon Set",
      content: "Single Unicode char, token-efficient, and familiar to models.",
    },
    {
      icon: Hash,
      title: "Hierarchical IDs",
      content:
        'Lets models reason about "file 3 symbol 2" without name clashes.',
    },
    {
      icon: SlidersHorizontal,
      title: "Preset System",
      content: "Hard-coded filters so you don’t need a complex configuration.",
    },
  ],
};

export const useCasesContent = {
  title: "Common Use-Cases",
  subtitle:
    "From refactoring to on-boarding, SCN accelerates your workflow.",
  prompts: [
    {
      scenario: "Refactor Epic",
      prompt: "SCN + “move auth logic to new package”",
    },
    { scenario: "Code Review", prompt: "SCN + “any circular deps?”" },
    {
      scenario: "Add Feature",
      prompt: "SCN + “add Stripe webhook handler following same pattern”",
    },
    {
      scenario: "Migration",
      prompt: "SCN + “convert from Express to Fastify”",
    },
    { scenario: "On-boarding", prompt: "SCN + “explain data flow”" },
  ],
};

export const contributeContent = {
  title: "Contribute to SCN",
  subtitle:
    "Help us map the world's code. Add a language, improve heuristics, or beat our performance benchmarks. All contributions are welcome.",
  buttonText: "View on GitHub",
};

export const heroContent = {
  title: "Understand any codebase in",
  highlightedTitle: "1k tokens.",
  subtitle: (
    <>
      SCN creates a dense, token-efficient cheat-sheet for your LLM.{" "}
      <br className="hidden md:block" />
      Paste it in, and watch your AI refactor, review, or port code without
      ever seeing the source.
    </>
  ),
  getStartedButton: "Get Started",
  playgroundButton: "Live Playground",
  before: {
    title: "BEFORE: 300+ tokens",
    code: `export class ApiClient {
  constructor(private apiKey: string) {}

  async fetchUsers(page: number): Promise<User[]> {
    const res = await fetch(\`/api/users?page=\${page}\`, {
      headers: { 'X-API-KEY': this.apiKey }
    });
    if (!res.ok) throw new Error("API Error");
    return res.json();
  }
}`,
  },
  after: {
    title: "AFTER: 38 tokens",
    code: `§1 src/api.ts
+ ◇ ApiClient
  - @ apiKey: #string
  + o constructor
  + ~ fetchUsers ...!
    > User`,
  },
};
