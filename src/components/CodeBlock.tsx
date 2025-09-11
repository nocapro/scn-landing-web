import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";

export const CodeBlock = ({
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