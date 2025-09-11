import { Section } from "@/components/Section";
import { InlineCode } from "@/components/InlineCode";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Box,
  GitMerge,
  Hash,
  Network,
  Puzzle,
  Scissors,
  SlidersHorizontal,
  Smile,
} from "lucide-react";

export const DesignDecisions = () => (
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
);