# Directory Structure
```
docs/
  landing.copy.md
src/
  components/
    ui/
      button.tsx
      card.tsx
      table.tsx
  lib/
    utils.ts
  App.tsx
  index.css
  main.tsx
bun-env.d.ts
components.json
index.html
package.json
postcss.config.cjs
tailwind.config.cjs
tsconfig.json
vite.config.ts
```

# Files

## File: docs/landing.copy.md
````markdown
# scn-ts – 400-token cheat-sheet your LLM actually reads
*Symbolic Context Notation for TypeScript/JavaScript/CSS and friends*

> “Show me the shape of your repo in 500 tokens or I’m not reading it.”

---

## 1. Why

Large Language Models are starving.
Feed them a whole repo and they drown in semicolons.
Feed them a file list and they hallucinate imports.

- **Context windows are tiny.** 8k tokens disappears fast when you paste `/src`.
- **GPT doesn’t need your `node_modules`.** It needs the graph – what talks to what.
- **You don’t need another IDE.** You need a 1-second command that turns *“here’s my repo”* into *“here’s the 400-token cheat-sheet the model actually reads”*.

scn-ts is a zero-config, WASM-powered static analyzer that spits out **SCN** – a dense, emoji-rich, token-counted summary of every symbol, dependency and cross-file call in your project.
Paste the output straight into GPT/Claude and watch it refactor, review or port your code without ever seeing the source.
---

## 2. What you get (real output)

```bash
$ npx scn-ts "src/**/*.{ts,tsx}" --exclude="**/*.test.ts" --preset=compact
```

```
§1 src/main.tsx
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
    + @ name: #string
```

- **§** file header (id + path)
- **+ / -** exported / private
- **◇ ~ {} ⛶ ¶** class, function, interface, JSX element, CSS rule
- **>** outgoing call / import
- **<** incoming caller
- **... ! o** async, throws, pure
- **#type** inline type signature
- numbers in `()` = unique IDs so the model can disambiguate `User` the interface from `User` the variable.

Token count: **352** for a 12-file mini SaaS – **92 % smaller** than minified source.

---

## 3. Token economics (why this matters)

| representation | tokens | % of 4 k window |
|---|---|---|
| raw source | 18 700 | 467 % ❌ |
| minified | 12 100 | 302 % ❌ |
| AST JSON | 9 400 | 235 % ❌ |
| **SCN compact** | **380** | **9 % ✅** |

You can now fit **ten services** in the same prompt that previously held *half* a service.

---

## 4. Live demo Playground – watch the count melt

[pg.scn.noca.pro](https://pg.scn.noca.pro) – drag-and-drop a folder, move the
“token target” slider, see the map re-shape in real time.

| slider move | tokens saved | architectural loss |
|---|---|---|
| hide private symbols | –35 % | zero |
| drop method bodies | –22 % | zero (signatures stay) |
| filter `*.test.ts` | –18 % | zero |
| collapse React props | –15 % | zero |
| **total** | **~ 70 %** | **none** |

---

## 5. CLI quick start

```bash
# global install
npm i -g scn-ts            # or yarn/pnpm/bun

# basic
scn-ts "src/**/*.{ts,tsx}" --output map.scn

# monorepo
scn-ts "apps/*/src/**/*" --exclude="**/*.stories.tsx" --max-workers=8

# watch mode
scn-ts "src/**/*" --watch --preset=minimal
```

All flags:

| flag | default | meaning |
|---|---|---|
| `--output, -o` | stdout | write to file |
| `--project, -p` | auto | path to tsconfig.json |
| `--preset` | default | minimal / compact / default / detailed / verbose |
| `--exclude` | [] | glob array |
| `--include` | [] | glob array (if omitted uses positional) |
| `--max-workers` | 1 | parallel parsers |
| `--watch` | false | re-gen on change |
| `--token-limit` | none | auto-tune preset to hit token budget |

---

## 6. Configuration file (check in to repo)

`scn.config.js`
```js
export default {
  include: ['src/**/*.{ts,tsx}'],
  exclude: ['**/*.test.ts', '**/generated/**'],
  preset: 'compact',
  output: 'scn.map',
  maxWorkers: 4,
  // you can still override via CLI
};
```

---

## 7. Programmatic API (Node / Bun)

```ts
import { generateScn } from 'scn-ts';

// file-system mode
const scn = await generateScn({
  include: ['src/**/*.ts'],
  exclude: ['**/*.spec.ts'],
  preset: 'compact'
});

// in-memory (browser or server)
const scn = await generateScn({
  files: [
    { path: 'main.ts', content: 'export const pi = 3.14' }
  ]
});
```

Return value is a plain string – send it to OpenAI, Anthropic, or your self-hosted model.

---

## 8. Browser / Edge-runtime usage

1. Copy WASM parsers once
   ```bash
   npx scn-ts copy-wasm ./public/wasm
   ```

2. Load & run (zero bundler config needed)
   ```html
   <script type="module">
     import { initializeParser, generateScn } from 'https://unpkg.com/scn-ts?module';
     await initializeParser({ wasmBaseUrl: '/wasm/' });

     const files = await getFilesFromDropzone(); // your UI
     const map  = generateScn({ files });
     prompt.value = map;          // 400 tokens
   </script>
   ```

Works in Chrome, Firefox, Safari, Node 18+, Deno, Bun, Vercel Edge, Cloudflare Workers.

---

## 9. SCN Specification (mini-RFC)

**Grammar (EBNF):**
```
file       ::= "§" fileId path [directive] LF topLevel+
topLevel   ::= indent (symbol | depLine) LF
symbol     ::= visibility icon id name [sig] [meta]
depLine    ::= ">" | "<" idList
visibility ::= "+" | "-"
icon       ::= "◇" | "~" | "@" | "{}" | "⛶" | "¶" | "☰" | "=:"
meta       ::= "..." | "!" | "o" | "[label]"
idList     ::= id *("," id)
```

**Unicode icons (stable, never change):**
| icon | meaning |
|---|---|
| `◇` | container (class, struct, component) |
| `~` | callable (function, method) |
| `@` | value (variable, property, constant) |
| `{}` | interface / trait |
| `☰` | enum |
| `=:` | type alias |
| `⛶` | JSX/HTML element |
| `¶` | CSS selector |

IDs are hierarchical: `(fileId.symbolId)` so GPT can follow edges without name clashes.

---

## 10. Language matrix (today)

| language | parser | symbols | deps | notes |
|---|---|---|---|---|
| TypeScript | ✅ | ◇ ~ @ {} ☰ =: | -> <- | full |
| TSX / JSX | ✅ | ◇ ~ @ ⛶ | -> <- | styled-components tag extracted |
| JavaScript | ✅ | ◇ ~ @ | -> <- | ES-module & CommonJS |
| CSS | ✅ | ¶ | -> <- | intents: 📐 ✍ 💧 |
| Go | ✅ | ◇ ~ | -> <- | goroutines tagged |
| Rust | ✅ | ◇ {} +impl | -> <- | traits & macros |
| Python | 🚧 | | | query WIP |
| Java | 🚧 | | | query WIP |

Adding a language = write 30-line tree-sitter query + 5-line icon map.
PRs welcome.

---

## 11. Token-impact API (advanced)

Ask “how many tokens will I save if I hide private methods?”
`scn-ts` re-serialises the graph twice and returns the delta:

```ts
const impact = calculateTokenImpact(analysedFiles, {
  showPrivateIndicator: false
});
console.log(impact.options.showPrivateIndicator); // -142
```

Use it to build **adaptive context** – keep shrinking until you fit the budget.

---

## 12. Performance (hypothetical)

Cold run (M1, 8 cores, 2 k files):

| stage | time |
|---|---|
| WASM init | 110 ms |
| parse + analyse | 480 ms |
| serialise (compact) | 25 ms |
| **total** | **< 0.6 s** |

Incremental watch mode: < 30 ms for a single-file change (tree-sitter incremental parse).

Memory: ~ 1.2 × source size during analysis, then GC’d.

---

## 13. Design decisions

- **tree-sitter** – incremental, error-tolerant, multi-language.
- **WASM** – same binary runs in browser, edge, or server.
- **No bundler magic** – ES modules only, `?module` CDN link works.
- **No AST dump** – we throw away *statements* and keep *symbols + edges*.
- **Topological sort** – GPT sees bottom-up dependencies, reduces hallucination.
- **Stable icon set** – single Unicode char, never本地化, token-efficient.
- **Hierarchical IDs** – lets model reason about “file 3 symbol 2” without names.
- **Preset system** – hard-coded filters so you don’t need a YAML engine.

---

## 14. Common use-cases

| scenario | paste this into prompt |
|---|---|
| refactor epic | SCN + “move auth logic to new package” |
| code review | SCN + “any circular deps?” |
| add feature | SCN + “add Stripe webhook handler following same pattern” |
| migration | SCN + “convert from Express to Fastify” |
| on-boarding | SCN + “explain data flow” |

---

## 15. FAQ

**Q: Does GPT really understand the icons?**
A: Yes. They are single Unicode chars and appear thousands of times in training data (Unicode chess, cards, etc.). We prompt-engineered once and never looked back.

**Q: Why not just `ctags` + `grep`?**
A: ctags is per-file, no cross-file edges, no token counting, no browser.

**Q: Will you break when TS 5.7 adds new syntax?**
A: Only if tree-sitter grammar breaks – usually fixed upstream within days. Our queries are tiny, easy to patch.

**Q: Proprietary code?**
A: Everything runs locally. WASM is loaded from your domain; no telemetry, no cloud.

---

## 16. Contributing

- Add a language: edit `/src/queries/yourlang.ts` + 5-line icon map.
- Improve heuristics (pure fn detection, React hooks, etc.).
- Speed: we have a `noop` parser benchmark – beat it.
- Docs: every PR that changes output must update *this* readme example.

Repo: [github.com/nocapro/scn-ts](https://github.com/nocapro/scn-ts)
Issues & feature requests welcome.

---

## 17. License

MIT © 2025 scn-ts contributors – built during the context-window crunch weeks.
Star if you hate pasting 3k lines into ChatGPT.

___

> SCN is the shared engine behind **www.noca.pro** – a zero-friction, Visual Context Engineering with AI-native patch engine that turns your clipboard into a surgical code-editing laser.
````

## File: src/components/ui/button.tsx
````typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
````

## File: src/components/ui/card.tsx
````typescript
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
````

## File: src/components/ui/table.tsx
````typescript
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
````

## File: src/lib/utils.ts
````typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
````

## File: src/main.tsx
````typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
````

## File: bun-env.d.ts
````typescript
// Generated by `bun init`

declare module "*.svg" {
  /**
   * A path to the SVG file
   */
  const path: `${string}.svg`;
  export = path;
}

declare module "*.module.css" {
  /**
   * A record of class names to their corresponding CSS module classes
   */
  const classes: { readonly [key: string]: string };
  export = classes;
}
````

## File: components.json
````json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
````

## File: index.html
````html
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>scn-ts – Symbolic Context Notation for TypeScript</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
````

## File: postcss.config.cjs
````
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
````

## File: tsconfig.json
````json
{
  "compilerOptions": {
    // Environment setup & latest features
    "lib": ["ESNext", "DOM"],
    "target": "ESNext",
    "module": "Preserve",
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "allowJs": true,

    // Bundler mode
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,

    // Best practices
    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    // Some stricter flags (disabled by default)
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noPropertyAccessFromIndexSignature": false
  },

  "exclude": ["dist", "node_modules"]
}
````

## File: vite.config.ts
````typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
````

## File: tailwind.config.cjs
````
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "Helvetica", "Arial", "sans-serif", "'Apple Color Emoji'", "'Segoe UI Emoji'", "'Segoe UI Symbol'"],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
````

## File: src/App.tsx
````typescript
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
  ArrowRight,
  BrainCircuit,
  Code,
  Copy,
  Github,
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
}: {
  children: string;
  lang?: string;
}) => (
  <div className="relative">
    <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-sm font-mono border">
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
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <Code className="h-6 w-6" />
            <span className="font-bold">scn-ts</span>
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
      </header>

      <main className="container max-w-5xl mx-auto px-4">
        <section className="text-center py-24 sm:py-32">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Understand any TypeScript repo in 400 tokens.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            scn-ts creates a dense, token-efficient cheat-sheet for your LLM.{" "}
            <br />
            Paste it in, and watch your AI refactor, review, or port code
            without ever seeing the source.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#section-5">
              <Button size="lg">
                Get Started <Terminal className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="https://pg.scn.noca.pro" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">
                Live Playground <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
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
      </main>

      <footer className="border-t">
        <div className="container max-w-5xl mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>MIT © 2025 scn-ts contributors</p>
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
````

## File: src/index.css
````css
@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%; /* white */
    --foreground: 224 71.4% 4.1%; /* near-black */
 
    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 224 71.4% 4.1%;
 
    --primary: 262.1 83.3% 57.8%; /* vivid violet */
    --primary-foreground: 0 0% 98%; /* near-white */
 
    --secondary: 220 14.3% 95.9%;
    --secondary-foreground: 220.9 39.3% 11%;
 
    --muted: 220 14.3% 95.9%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --accent: 220 14.3% 95.9%;
    --accent-foreground: 220.9 39.3% 11%;
 
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
 
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 263.4 95.2% 66.3%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 224 71.4% 4.1%;
    --foreground: 0 0% 98%;
 
    --card: 224 71.4% 4.1%;
    --card-foreground: 0 0% 98%;
 
    --popover: 224 71.4% 4.1%;
    --popover-foreground: 0 0% 98%;
 
    --primary: 263.4 95.2% 66.3%;
    --primary-foreground: 224 71.4% 4.1%;
 
    --secondary: 215 27.9% 16.9%;
    --secondary-foreground: 0 0% 98%;
 
    --muted: 215 27.9% 16.9%;
    --muted-foreground: 215 20.2% 65.1%;
 
    --accent: 215 27.9% 16.9%;
    --accent-foreground: 0 0% 98%;
 
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
 
    --border: 215 27.9% 16.9%;
    --input: 215 27.9% 16.9%;
    --ring: 263.4 95.2% 66.3%;
  }
}
 
@layer base {
  html {
    @apply scroll-smooth;
  }
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
````

## File: package.json
````json
{
  "name": "bun-react-template",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.525.0",
    "react": "^19",
    "react-dom": "^19"
  },
  "devDependencies": {
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/bun": "latest",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.4",
    "tailwindcss-animate": "^1.0.7",
    "vite": "^5.4.1"
  }
}
````
