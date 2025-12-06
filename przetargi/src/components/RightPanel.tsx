import { Mic, Video, GitCompare } from "lucide-react";
import { useState } from "react";
import { DetailModal } from "@/components/DetailModal";

interface StudioTool {
  id: string;
  name: string;
  icon: React.ElementType;
}

const studioTools: StudioTool[] = [
  { id: "audio", name: "Audio Summary", icon: Mic },
  { id: "video", name: "Video Summary", icon: Video },
  { id: "compare", name: "Compare Docs", icon: GitCompare },
];

export const RightPanel = () => {
  const [selectedTool, setSelectedTool] = useState<StudioTool | null>(null);

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-[hsl(var(--panel-border))]">
          <h2 className="font-semibold text-foreground">Studio</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            {studioTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-border bg-card hover:bg-accent/50 hover:border-primary transition-all group"
                >
                  <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors">
                    {tool.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedTool && (
        <DetailModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </>
  );
};
