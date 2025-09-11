import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowRight,
  Box,
  BrainCircuit,
  Copy,
  GitMerge,
  Github,
  Hash,
  Network,
  Puzzle,
  MessageSquare,
  Scissors,
  SlidersHorizontal,
  Smile,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";

const Section = ({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className={cn("py-20 sm:py-28 border-t", className)}
  >
    {children}
  </section>
);

const CodeBlock = ({
  children,
  lang = "bash",
  className,
}: {
  children: string;
  lang?: string;
  className?: string;
}) => (
  <div className="relative">
    <pre
      className={cn(
        "bg-secondary p-4 rounded-lg text-sm font-mono border whitespace-pre-wrap",
        className
      )}
    >
      <code className={`language-${lang}`}>{children.trim()}</code>
    </pre>
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 h-8 w-8"
      onClick={() => navigator.clipboard.writeText(children.trim())}
    >
      <Copy className="h-4 w-4" />
    </Button>
  </div>
);

const InlineCode = ({ children }: { children: string }) => (
  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
    {children}
  </code>
);

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[20%] translate-y-[20%] rounded-full bg-primary/20 opacity-50 blur-[80px]"></div>
        <div className="absolute bottom-0 right-auto left-0 top-auto h-[500px] w-[500px] translate-x-[20%] -translate-y-[10%] rounded-full bg-secondary opacity-50 blur-[80px]"></div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <a href="#" className="flex items-center space-x-2.5">
            <span className="text-2xl text-primary font-black -translate-y-0.5">◮</span>
            <span className="font-bold">SCN</span>
            <span className="text-xs font-medium border rounded-full px-2 py-0.5 border-primary/50 text-primary bg-primary/10">
              Open Source
            </span>
          </a>
          <div className="flex items-center gap-2">
            <a href="https://discord.gg/your-invite" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Discord
              </Button>
            </a>
            <a
              href="https://github.com/nocapro/scn-ts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4">
        <section className="grid lg:grid-cols-2 gap-12 items-center py-24 sm:py-32">
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 opacity-0 animate-fade-in">
              Understand any TypeScript repo in 400 tokens.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 opacity-0 animate-fade-in [animation-delay:0.2s]">
              SCN creates a dense, token-efficient cheat-sheet for your LLM.{" "}
              <br className="hidden md:block" />
              Paste it in, and watch your AI refactor, review, or port code
              without ever seeing the source.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-in [animation-delay:0.3s]">
              <a href="#section-5">
                <Button size="lg">
                  Get Started <Terminal className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a
                href="https://pg.scn.noca.pro"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  Live Playground <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
          <div className="relative rounded-xl border p-4 lg:p-6 bg-gradient-to-b from-secondary/30 to-background">
            <Card className="bg-background/50 backdrop-blur-sm opacity-0 animate-slide-in-from-top [animation-delay:0.5s]">
              <CardHeader className="flex-row items-center justify-between p-4">
                <CardTitle className="text-base font-semibold text-muted-foreground">
                  BEFORE: 300+ tokens
                </CardTitle>
                <Zap className="h-5 w-5 text-destructive" />
              </CardHeader>
              <CardContent className="p-0">
                <CodeBlock
                  lang="typescript"
                  className="border-0 rounded-t-none bg-transparent p-4"
                >{`export class ApiClient {
  constructor(private apiKey: string) {}

  async fetchUsers(page: number): Promise<User[]> {
    const res = await fetch(\`/api/users?page=\${page}\`, {
      headers: { 'X-API-KEY': this.apiKey }
    });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  }
}`}</CodeBlock>
              </CardContent>
            </Card>

            <div className="my-6 flex justify-center opacity-0 animate-fade-in [animation-delay:0.7s]">
              <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground animate-pulse">
                <ArrowDown className="h-5 w-5" />
              </div>
            </div>

            <Card className="border-primary/50 bg-background/50 backdrop-blur-sm animate-glow opacity-0 animate-slide-in-from-bottom [animation-delay:0.9s]">
              <CardHeader className="flex-row items-center justify-between p-4">
                <CardTitle className="text-base font-semibold text-muted-foreground">
                  AFTER: 38 tokens
                </CardTitle>
                <Zap className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent className="p-0">
                <CodeBlock
                  lang="text"
                  className="border-0 rounded-t-none bg-transparent p-4"
                >{`§1 src/api.ts
+ ◇ ApiClient
  - @ apiKey: #string
  + o constructor
  + ~ fetchUsers ...!
    > User`}</CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        <Section id="section-1">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              The High Cost of Context
            </h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              LLMs are powerful, but their attention is expensive and limited.
              Traditional methods of providing context just don't scale.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Token Limits</CardTitle>
              </CardHeader>
              <CardContent>
                Context windows are tiny. Pasting <InlineCode>/src</InlineCode>{" "}
                consumes your entire budget before you've even asked a question.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BrainCircuit className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Signal vs. Noise</CardTitle>
              </CardHeader>
              <CardContent>
                Models don't need semicolons, they need the dependency graph—what
                talks to what, and who calls whom.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Workflow className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Broken Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                You don't need another IDE. You need a 1-second command that
                turns <em>“here’s my repo”</em> into{" "}
                <em>“here’s the summary”</em>.
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section id="section-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              The Solution: Symbolic Context Notation
            </h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
              A zero-config, WASM-powered static analyzer that spits out a
              dense, emoji-rich, token-counted summary of your project.
            </p>
          </div>
          <CodeBlock>{`$ npx scn-ts "src/**/*.{ts,tsx}" --exclude="**/*.test.ts" --preset=compact`}</CodeBlock>
          <Card className="mt-8">
            <CardContent className="p-6">
              <CodeBlock lang="text">{`§1 src/main.tsx
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
    + @ name: #string`}</CodeBlock>
            </CardContent>
          </Card>
          <div className="mt-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Symbol</TableHead>
                  <TableHead>Meaning</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <InlineCode>§</InlineCode>
                  </TableCell>
                  <TableCell>File header (id + path)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <InlineCode>+ / -</InlineCode>
                  </TableCell>
                  <TableCell>Exported / Private symbol</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <InlineCode>◇ ~ {}</InlineCode>
                  </TableCell>
                  <TableCell>Class, Function, Interface, JSX element</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <InlineCode>&gt; / &lt;</InlineCode>
                  </TableCell>
                  <TableCell>Outgoing / Incoming call or import</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <InlineCode>... ! o</InlineCode>
                  </TableCell>
                  <TableCell>Async, Throws, Pure function</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Section>

        <Section id="section-3">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Token Economics
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              Fit 10x more context into every prompt.
            </p>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Representation</TableHead>
                    <TableHead>Tokens</TableHead>
                    <TableHead>% of 4k Window</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Raw Source</TableCell>
                    <TableCell>18,700</TableCell>
                    <TableCell>467% ❌</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Minified</TableCell>
                    <TableCell>12,100</TableCell>
                    <TableCell>302% ❌</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>AST JSON</TableCell>
                    <TableCell>9,400</TableCell>
                    <TableCell>235% ❌</TableCell>
                  </TableRow>
                  <TableRow className="bg-primary/10 hover:bg-primary/20">
                    <TableCell className="font-bold text-primary">
                      SCN Compact
                    </TableCell>
                    <TableCell className="font-bold text-primary">
                      380
                    </TableCell>
                    <TableCell className="font-bold text-primary">
                      9% ✅
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Section>

        <Section id="section-4">
          <Card className="text-center p-8 md:p-12 bg-secondary/50">
            <h2 className="text-3xl font-bold tracking-tight">
              Live Demo Playground
            </h2>
            <p className="text-lg text-muted-foreground mt-2 mb-8">
              Drag-and-drop a folder, move the slider, and watch the map
              re-shape in real time.
            </p>
            <a
              href="https://pg.scn.noca.pro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">
                Try the Playground <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </Card>
        </Section>

        <Section id="section-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              CLI Quick Start
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              Get started in under a minute.
            </p>
          </div>
          <CodeBlock>{`# global install
npm i -g scn-ts            # or yarn/pnpm/bun

# basic
scn-ts "src/**/*.{ts,tsx}" --output map.scn

# monorepo
scn-ts "apps/*/src/**/*" --exclude="**/*.stories.tsx" --max-workers=8

# watch mode
scn-ts "src/**/*" --watch --preset=minimal`}</CodeBlock>
        </Section>

        <Section id="section-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="border-t pt-4">
              <p className="font-semibold text-lg">
                Does GPT really understand the icons?
              </p>
              <p className="text-muted-foreground mt-1">
                Yes. They are single Unicode chars and appear thousands of times
                in training data (Unicode chess, cards, etc.). We
                prompt-engineered once and never looked back.
              </p>
            </div>
            <div className="border-t pt-4">
              <p className="font-semibold text-lg">
                Why not just <InlineCode>ctags</InlineCode> +{" "}
                <InlineCode>grep</InlineCode>?
              </p>
              <p className="text-muted-foreground mt-1">
                ctags is per-file, has no concept of cross-file edges, offers no token counting, and has no browser-based playground.
              </p>
            </div>
            <div className="border-t pt-4">
              <p className="font-semibold text-lg">
                Will you break when TS 5.7 adds new syntax?
              </p>
              <p className="text-muted-foreground mt-1">
                Only if the underlying tree-sitter grammar breaks, which is
                usually fixed upstream within days. Our queries are tiny and easy to patch.
              </p>
            </div>
            <div className="border-t pt-4">
              <p className="font-semibold text-lg">
                Is my proprietary code safe?
              </p>
              <p className="text-muted-foreground mt-1">
                Everything runs locally on your machine. The WASM is loaded from
                your domain; there is no telemetry and no cloud dependency.
              </p>
            </div>
          </div>
        </Section>

        <Section id="section-7">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Design Decisions
            </h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              Built on a foundation of modern, performant, and portable
              technologies.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <GitMerge className="h-8 w-8 text-primary mb-2" />
                <CardTitle>tree-sitter</CardTitle>
              </CardHeader>
              <CardContent>
                Incremental, error-tolerant, multi-language parsing.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Box className="h-8 w-8 text-primary mb-2" />
                <CardTitle>WASM</CardTitle>
              </CardHeader>
              <CardContent>
                Same binary runs in browser, edge, or server.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Puzzle className="h-8 w-8 text-primary mb-2" />
                <CardTitle>No Bundler Magic</CardTitle>
              </CardHeader>
              <CardContent>
                ES modules only, <InlineCode>?module</InlineCode> CDN link
                works.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Scissors className="h-8 w-8 text-primary mb-2" />
                <CardTitle>No AST Dump</CardTitle>
              </CardHeader>
              <CardContent>
                We throw away <em>statements</em> and keep{" "}
                <em>symbols + edges</em>.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Network className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Topological Sort</CardTitle>
              </CardHeader>
              <CardContent>
                GPT sees bottom-up dependencies, which reduces hallucination.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Smile className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Stable Icon Set</CardTitle>
              </CardHeader>
              <CardContent>
                Single Unicode char, token-efficient, and familiar to models.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Hash className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Hierarchical IDs</CardTitle>
              </CardHeader>
              <CardContent>
                Lets models reason about "file 3 symbol 2" without name clashes.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <SlidersHorizontal className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Preset System</CardTitle>
              </CardHeader>
              <CardContent>
                Hard-coded filters so you don’t need a complex configuration.
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section id="section-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Common Use-Cases
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              From refactoring to on-boarding, scn-ts accelerates your
              workflow.
            </p>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3 sm:w-[200px]">
                      Scenario
                    </TableHead>
                    <TableHead>Example Prompt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Refactor Epic</TableCell>
                    <TableCell>
                      <InlineCode>
                        SCN + “move auth logic to new package”
                      </InlineCode>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Code Review</TableCell>
                    <TableCell>
                      <InlineCode>SCN + “any circular deps?”</InlineCode>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Add Feature</TableCell>
                    <TableCell>
                      <InlineCode>
                        SCN + “add Stripe webhook handler following same
                        pattern”
                      </InlineCode>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Migration</TableCell>
                    <TableCell>
                      <InlineCode>
                        SCN + “convert from Express to Fastify”
                      </InlineCode>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">On-boarding</TableCell>
                    <TableCell>
                      <InlineCode>SCN + “explain data flow”</InlineCode>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Section>

        <Section id="section-9">
          <Card className="text-center p-8 md:p-12 bg-secondary/50">
            <h2 className="text-3xl font-bold tracking-tight">
              Contribute to SCN
            </h2>
            <p className="text-lg text-muted-foreground mt-2 mb-8 max-w-2xl mx-auto">
              Help us map the world's code. Add a language, improve heuristics,
              or beat our performance benchmarks. All contributions are welcome.
            </p>
            <a
              href="https://github.com/nocapro/scn-ts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="secondary">
                <Github className="mr-2 h-4 w-4" /> View on GitHub
              </Button>
            </a>
          </Card>
        </Section>
      </main>

      <footer className="border-t">
        <div className="container max-w-5xl mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>MIT © 2025 SCN contributors</p>
          <p className="text-sm mt-4 max-w-xl mx-auto">
            SCN is the shared engine behind{" "}
            <a
              href="https://www.noca.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-primary"
            >
              noca.pro
            </a>{" "}
            – a zero-friction, Visual Context Engineering platform with an AI-native patch engine.
          </p>
        </div>
      </footer>
    </div>
  );
}