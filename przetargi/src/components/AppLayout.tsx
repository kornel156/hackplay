import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeftPanel } from "@/components/LeftPanel";
import { RightPanel } from "@/components/RightPanel";
import { MainContent } from "@/components/MainContent";
import { ChatInput } from "@/components/ChatInput";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const AppLayout = () => {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch('http://10.19.200.222:5001/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: content,
          top_k: 10
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer || "I couldn't generate a response at this time.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request. Please make sure the chat-rag server is running on port 5001.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      {/* Top Bar */}
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            className="gap-2"
          >
            {leftPanelOpen ? (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span className="hidden sm:inline">Hide Sources</span>
              </>
            ) : (
              <>
                <PanelLeftOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Show Sources</span>
              </>
            )}
          </Button>
          <h1 className="text-lg font-semibold">AI Research Assistant</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground font-medium text-sm">
            P
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
            className="gap-2"
          >
            {rightPanelOpen ? (
              <>
                <span className="hidden sm:inline">Hide Studio</span>
                <PanelRightClose className="h-4 w-4" />
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Show Studio</span>
                <PanelRightOpen className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden w-full">
        {/* Left Panel */}
        <aside
          className={`border-r border-border bg-[hsl(var(--panel-background))] transition-all duration-300 flex-shrink-0 ${
            leftPanelOpen ? "w-[280px]" : "w-0"
          } overflow-hidden`}
        >
          <LeftPanel />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <MainContent messages={messages} />
          </div>
          <div className="border-t border-border bg-card p-4 flex-shrink-0">
            <ChatInput onSend={handleSendMessage} />
          </div>
        </main>

        {/* Right Panel */}
        <aside
          className={`border-l border-border bg-[hsl(var(--panel-background))] transition-all duration-300 flex-shrink-0 ${
            rightPanelOpen ? "w-[280px]" : "w-0"
          } overflow-hidden`}
        >
          <RightPanel />
        </aside>
      </div>
    </div>
  );
};
