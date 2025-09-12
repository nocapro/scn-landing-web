import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard.hook";

export const CodeBlock = ({
  children,
  rawString,
  lang = "bash",
  className,
}: {
  children: React.ReactNode;
  rawString?: string;
  lang?: string;
  className?: string;
}) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const textToCopy = (
    rawString ?? (typeof children === "string" ? children : "")
  ).trim();

  return (
    <div className="relative">
      <pre
        className={cn(
          "whitespace-pre-wrap rounded-lg border bg-secondary p-4 font-mono text-sm",
          className
        )}
      >
        <code className={`language-${lang}`}>{children}</code>
      </pre>
      {textToCopy && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 size-8"
          onClick={() => copyToClipboard(textToCopy)}
        >
          {isCopied ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <Copy className="size-4" />
          )}
        </Button>
      )}
    </div>
  );
};