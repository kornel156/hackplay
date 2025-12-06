import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { User, Bot } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface MainContentProps {
  messages: Message[];
}

export const MainContent = ({ messages }: MainContentProps) => {
  return (
    <div className="h-full p-6 max-w-5xl mx-auto">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground leading-tight">
          Smart Tracker: Professional System for Tracking Legislative Processes
        </h1>

        <div className="bg-accent rounded-lg p-6 border border-primary/20">
          <p className="text-accent-foreground leading-relaxed">
            Smart Tracker is a professional system designed for tracking legislative processes within the Polish legal system, featuring an advanced legal document comparison tool called Legal Diff. The platform monitors the progress of draft acts through various stages of the legislative process, from initial proposals to final committee reviews. In the example shown, it tracks the draft act on artificial intelligence systems, designated as UC71.
          </p>
          <p className="text-accent-foreground leading-relaxed mt-4">
            The legislative process is divided into nine main stages: project proposal, harmonization, public consultations, and review processes within committees of the Council of Ministers including the Committee for Digitalization, Committee for European Affairs, Social Committee, Economic Committee, and the Standing Committee of the Council of Ministers. Each stage displays the date of last modification, allowing for real-time progress tracking.
          </p>
          <p className="text-accent-foreground leading-relaxed mt-4">
            A key feature is the Legal Diff tool for analyzing differences between document versions. For instance, comparing Version A from the European Affairs Committee stage with Version B from the Standing Committee stage reveals significant changes: the supervisory body name changed from "Commission for the Development of Artificial Intelligence" to "Commission for the Development and Security of Artificial Intelligence". The chairman appointment procedure was modified to be appointed by the Prime Minister on proposal from the minister for digital affairs. Administrative financial penalties were increased from 15 million euros to 35 million euros, or from 3% to 7% of global annual turnover, whichever is higher.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="font-semibold text-primary mb-3">Topics</h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li>• Legislative Process Tracking</li>
              <li>• AI Systems Regulation</li>
              <li>• Legal Document Comparison</li>
              <li>• Polish Government Procedures</li>
              <li>• Artificial Intelligence Law</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-3">Institutions Concerned</h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li>• Council of Ministers</li>
              <li>• Ministry of Digital Affairs</li>
              <li>• Committee for European Affairs</li>
              <li>• Standing Committee of the Council of Ministers</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-primary mb-3">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              #SmartTracker
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              #AILaw
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              #LegislativeTracking
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              #LegalDiff
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              #PolishGovernment
            </Badge>
          </div>
        </div>

        {/* Chat Messages */}
        {messages.length > 0 && (
          <div className="mt-12 space-y-4">
            <div className="border-t border-border pt-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Conversation</h2>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}>
                      {message.role === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <Card className={`p-4 max-w-[70%] ${
                      message.role === "user" 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-card"
                    }`}>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            {message.role === "user" ? "You" : "AI Assistant"}
                          </span>
                          <span className={`text-xs ${
                            message.role === "user" 
                              ? "text-primary-foreground/70" 
                              : "text-muted-foreground"
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        {message.role === "user" ? (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        ) : (
                          <div className="text-sm leading-relaxed prose prose-sm max-w-none">
                            <ReactMarkdown>
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
