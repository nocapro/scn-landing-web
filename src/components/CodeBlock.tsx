import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard.hook";

export const CodeBlock = ({
  children,
  lang = "bash",
  className,
}: {
  children: string;
  lang?: string;
  className?: string;
}) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const textToCopy = children.trim();

  return (
    <div className="relative">
      <pre
        className={cn(
          "rounded-lg border bg-secondary p-4 font-mono text-sm whitespace-pre-wrap",
          className
        )}
      >
        <code className={`language-${lang}`}>{textToCopy}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 size-8"
        onClick={() => copyToClipboard(textToCopy)}
        disabled={!textToCopy}
      >
        {isCopied ? (
          <Check className="size-4 text-green-500" />
        ) : (
          <Copy className="size-4" />
        )}
      </Button>
    </div>
  );
};