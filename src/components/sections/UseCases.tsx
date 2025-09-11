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

export const UseCases = () => (
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
);