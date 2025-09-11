import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrainCircuit, Workflow, Zap } from "lucide-react";
import { Section } from "@/components/Section";
import { InlineCode } from "@/components/InlineCode";

export const ContextCost = () => (
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
);