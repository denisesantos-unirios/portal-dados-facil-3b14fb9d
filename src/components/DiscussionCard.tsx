import { Discussion } from "@/types/forum";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MessageSquare, ThumbsUp, Clock } from "lucide-react";

interface DiscussionCardProps {
  discussion: Discussion;
}

export function DiscussionCard({ discussion }: DiscussionCardProps) {
  return (
    <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer border-border/50">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge className={`${discussion.categoryColor} text-white text-xs px-2 py-0.5`}>
              {discussion.categoryName}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {discussion.createdAt}
            </span>
          </div>
          <h3 className="font-semibold text-foreground mb-1 truncate">
            {discussion.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
            {discussion.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {discussion.author}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {discussion.responses} respostas
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" />
              {discussion.likes}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
