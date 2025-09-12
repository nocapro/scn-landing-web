import { Section } from "@/components/Section";
import { InlineCode } from "@/components/InlineCode";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCasesContent } from "@/content/sections.content";

export const UseCases = () => (
  <Section id="section-8">
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight">
        {useCasesContent.title}
      </h2>
      <p className="mt-2 text-lg text-muted-foreground">
        {useCasesContent.subtitle}
      </p>
    </div>
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3 sm:w-[200px]">Scenario</TableHead>
              <TableHead>Example Prompt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {useCasesContent.prompts.map((useCase, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{useCase.scenario}</TableCell>
                <TableCell>
                  <InlineCode>{useCase.prompt}</InlineCode>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </Section>
);