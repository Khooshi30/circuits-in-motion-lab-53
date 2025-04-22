
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { InfoIcon } from "lucide-react";

interface TipCardProps {
  title: string;
  children: React.ReactNode;
}

export function TipCard({ title, children }: TipCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`transition-all duration-300 ${isExpanded ? "animate-float" : ""}`}>
      <Card 
        className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 shadow-sm hover:shadow"
      >
        <CardContent className="p-4">
          <div 
            className="flex items-start gap-3 cursor-pointer" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-300 flex items-center">
                {title}
              </h4>
              <div 
                className={`text-sm text-blue-700 dark:text-blue-400 mt-1 overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-96" : "max-h-0"
                }`}
              >
                {children}
              </div>
            </div>
          </div>
          {!isExpanded && (
            <p className="text-xs text-blue-600 dark:text-blue-500 mt-1 ml-8">
              Click to expand
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
