import { FileText, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { DocumentPreviewModal } from "@/components/DocumentPreviewModal";

interface SourceItem {
  id: string;
  type: "pdf" | "link";
  name: string;
  url?: string;
}

const mockSources: SourceItem[] = [
  { id: "1", type: "pdf", name: "2103.17280v1.pdf" },
  { id: "2", type: "pdf", name: "2303.14630v1.pdf" },
  { id: "3", type: "pdf", name: "2309.06180v1.pdf" },
];

export const LeftPanel = () => {
  const [selectedDocument, setSelectedDocument] = useState<SourceItem | null>(null);

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-[hsl(var(--panel-border))]">
          <h2 className="font-semibold text-foreground">Source Materials</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {mockSources.map((source) => (
              <button
                key={source.id}
                onClick={() => setSelectedDocument(source)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors text-left group"
              >
                {source.type === "pdf" ? (
                  <FileText className="h-5 w-5 text-destructive flex-shrink-0" />
                ) : (
                  <LinkIcon className="h-5 w-5 text-primary flex-shrink-0" />
                )}
                <span className="text-sm text-foreground group-hover:text-accent-foreground truncate">
                  {source.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedDocument && (
        <DocumentPreviewModal
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </>
  );
};
