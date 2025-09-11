import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, Code, Copy, Github } from "lucide-react";

const Section = ({
  num,
  title,
  children,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="py-12" id={`section-${num}`}>
    <h2 className="text-3xl font-bold tracking-tight mb-8">
      <span className="text-primary mr-4">{num}.</span>
      {title}
    </h2>
    <div className="space-y-6 text-lg text-muted-foreground">{children}</div>
  </section>
);

const CodeBlock = ({
  children,
  lang = "bash",
}: {
  children: string;
  lang?: string;
}) => (
  <div className="relative">
    <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-sm font-mono border">
      <code>{children.trim()}</code>
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
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(109,40,217,0.25)] opacity-50 blur-[80px]"></div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <Code className="h-6 w-6" />
            <span className="font-bold">scn-ts</span>
          </a>
          <a href="https://github.com/nocapro/scn-ts" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </a>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-16">
        <section className="text-center py-20">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4">
            scn-ts – 400-token cheat-sheet your LLM actually reads
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Symbolic Context Notation for TypeScript/JavaScript/CSS and friends
          </p>
          <blockquote className="text-lg italic border-l-4 border-primary pl-4 text-left max-w-xl mx-auto my-12">
            “Show me the shape of your repo in 500 tokens or I’m not reading it.”
          </blockquote>
        </section>

        <Section num={1} title="Why">
          <p>Large Language Models are starving.
          Feed them a whole repo and they drown in semicolons.
          Feed them a file list and they hallucinate imports.</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Context windows are tiny.</strong> 8k tokens disappears fast when you paste <InlineCode>/src</InlineCode>.</li>
            <li><strong>GPT doesn’t need your <InlineCode>node_modules</InlineCode>.</strong> It needs the graph – what talks to what.</li>
            <li><strong>You don’t need another IDE.</strong> You need a 1-second command that turns <em>“here’s my repo”</em> into <em>“here’s the 400-token cheat-sheet the model actually reads”</em>.</li>
          </ul>
          <p>scn-ts is a zero-config, WASM-powered static analyzer that spits out <strong>SCN</strong> – a dense, emoji-rich, token-counted summary of every symbol, dependency and cross-file call in your project. Paste the output straight into GPT/Claude and watch it refactor, review or port your code without ever seeing the source.</p>
        </Section>

        <Section num={2} title="What you get (real output)">
          <CodeBlock>{`$ npx scn-ts "src/**/*.{ts,tsx}" --exclude="**/*.test.ts" --preset=compact`}</CodeBlock>
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
          <ul className="space-y-2 text-base">
            <li><strong>§</strong> file header (id + path)</li>
            <li><strong>+ / -</strong> exported / private</li>
            <li><strong>◇ ~ {} ⛶ ¶</strong> class, function, interface, JSX element, CSS rule</li>
            <li><strong>&gt;</strong> outgoing call / import</li>
            <li><strong>&lt;</strong> incoming caller</li>
            <li><strong>... ! o</strong> async, throws, pure</li>
            <li><strong>#type</strong> inline type signature</li>
            <li>numbers in <InlineCode>()</InlineCode> = unique IDs so the model can disambiguate <InlineCode>User</InlineCode> the interface from <InlineCode>User</InlineCode> the variable.</li>
          </ul>
          <p>Token count: <strong>352</strong> for a 12-file mini SaaS – <strong>92% smaller</strong> than minified source.</p>
        </Section>
        
        <Section num={3} title="Token economics (why this matters)">
            <Card><CardContent className="p-0">
                <Table>
                    <TableHeader><TableRow><TableHead>representation</TableHead><TableHead>tokens</TableHead><TableHead>% of 4k window</TableHead></TableRow></TableHeader>
                    <TableBody>
                        <TableRow><TableCell>raw source</TableCell><TableCell>18 700</TableCell><TableCell>467% ❌</TableCell></TableRow>
                        <TableRow><TableCell>minified</TableCell><TableCell>12 100</TableCell><TableCell>302% ❌</TableCell></TableRow>
                        <TableRow><TableCell>AST JSON</TableCell><TableCell>9 400</TableCell><TableCell>235% ❌</TableCell></TableRow>
                        <TableRow><TableCell className="font-bold">SCN compact</TableCell><TableCell className="font-bold">380</TableCell><TableCell className="font-bold text-green-400">9% ✅</TableCell></TableRow>
                    </TableBody>
                </Table>
            </CardContent></Card>
            <p>You can now fit <strong>ten services</strong> in the same prompt that previously held <em>half</em> a service.</p>
        </Section>

        <Section num={4} title="Live demo Playground – watch the count melt">
          <a href="https://pg.scn.noca.pro" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg">
              pg.scn.noca.pro <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <p>Drag-and-drop a folder, move the “token target” slider, see the map re-shape in real time.</p>
          <Card><CardContent className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>slider move</TableHead><TableHead>tokens saved</TableHead><TableHead>architectural loss</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow><TableCell>hide private symbols</TableCell><TableCell>–35 %</TableCell><TableCell>zero</TableCell></TableRow>
                <TableRow><TableCell>drop method bodies</TableCell><TableCell>–22 %</TableCell><TableCell>zero (signatures stay)</TableCell></TableRow>
                <TableRow><TableCell>filter <InlineCode>*.test.ts</InlineCode></TableCell><TableCell>–18 %</TableCell><TableCell>zero</TableCell></TableRow>
                <TableRow><TableCell>collapse React props</TableCell><TableCell>–15 %</TableCell><TableCell>zero</TableCell></TableRow>
                <TableRow><TableCell className="font-bold">total</TableCell><TableCell className="font-bold">~ 70 %</TableCell><TableCell className="font-bold">none</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent></Card>
        </Section>
        
        <Section num={5} title="CLI quick start">
          <CodeBlock>{`# global install
npm i -g scn-ts            # or yarn/pnpm/bun

# basic
scn-ts "src/**/*.{ts,tsx}" --output map.scn

# monorepo
scn-ts "apps/*/src/**/*" --exclude="**/*.stories.tsx" --max-workers=8

# watch mode
scn-ts "src/**/*" --watch --preset=minimal`}</CodeBlock>
        </Section>
        
        <Section num={15} title="FAQ">
            <div className="space-y-4">
                <p><strong>Q: Does GPT really understand the icons?</strong><br/>
                A: Yes. They are single Unicode chars and appear thousands of times in training data (Unicode chess, cards, etc.). We prompt-engineered once and never looked back.</p>
                <p><strong>Q: Why not just <InlineCode>ctags</InlineCode> + <InlineCode>grep</InlineCode>?</strong><br/>
                A: ctags is per-file, no cross-file edges, no token counting, no browser.</p>
                <p><strong>Q: Will you break when TS 5.7 adds new syntax?</strong><br/>
                A: Only if tree-sitter grammar breaks – usually fixed upstream within days. Our queries are tiny, easy to patch.</p>
                <p><strong>Q: Proprietary code?</strong><br/>
                A: Everything runs locally. WASM is loaded from your domain; no telemetry, no cloud.</p>
            </div>
        </Section>
      </main>
      
      <footer className="border-t">
        <div className="container max-w-5xl mx-auto px-4 py-8 text-center text-muted-foreground">
            <p>MIT © 2025 scn-ts contributors – built during the context-window crunch weeks.</p>
            <p className="mt-2">Star if you hate pasting 3k lines into ChatGPT.</p>
            <hr className="my-8 border-border" />
            <p className="text-sm">
                SCN is the shared engine behind <a href="https://www.noca.pro" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.noca.pro</a> – a zero-friction, Visual Context Engineering with AI-native patch engine that turns your clipboard into a surgical code-editing laser.
            </p>
        </div>
      </footer>
    </div>
  );
}