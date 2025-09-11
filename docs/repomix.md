# Directory Structure
```
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

## File: src/components/ui/button.tsx
```typescript
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
```

## File: src/components/ui/card.tsx
```typescript
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
```

## File: src/components/ui/table.tsx
```typescript
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
```

## File: src/main.tsx
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## File: index.html
```html
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
```

## File: postcss.config.cjs
```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## File: tailwind.config.cjs
```
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
```

## File: vite.config.ts
```typescript
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
```

## File: src/lib/utils.ts
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## File: src/App.tsx
```typescript
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
```

## File: src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
 
    --primary: 262.1 83.3% 57.8%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 215.4 16.3% 46.9%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 215.4 16.3% 46.9%;
 
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
 
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
 
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
 
    --primary: 263.4 95.2% 66.3%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
 
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
 
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
 
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
 
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 263.4 95.2% 66.3%;
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## File: bun-env.d.ts
```typescript
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
```

## File: components.json
```json
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
```

## File: tsconfig.json
```json
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
```

## File: package.json
```json
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
```
