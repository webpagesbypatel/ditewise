
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      {article.imageUrl && (
        <CardHeader className="p-0">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
            data-ai-hint={article.aiHint}
          />
        </CardHeader>
      )}
      <CardContent className="p-4 space-y-2 flex-grow">
        <Badge variant="outline">{article.category}</Badge>
        <CardTitle className="text-xl font-semibold">{article.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">{article.summary}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 mt-auto">
        <Button variant="ghost" asChild className="w-full justify-start text-primary hover:text-primary/80">
          <Link href={`/learn/${article.id}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Placeholder data for demonstration
export const placeholderArticles: Article[] = [
  { id: "1", title: "Understanding Type 2 Diabetes", summary: "Learn about the causes, symptoms, and management of Type 2 Diabetes through diet and lifestyle.", imageUrl: "https://images.unsplash.com/photo-1599814516324-66aa0bf16425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxVbmRlcnN0YW5kaW5nJTIwVHlwZSUyMDIlMjBEaWFiZXRlc3xlbnwwfHx8fDE3NDc5MDY4MTN8MA&ixlib=rb-4.1.0&q=80&w=400", category: "Chronic Diseases", aiHint: "health medical" },
  { id: "2", title: "The Power of Protein", summary: "Discover the importance of protein in your diet for muscle health, satiety, and overall wellness.", imageUrl: "https://images.unsplash.com/photo-1535473895227-bdecb20fb157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxQcm90ZWlufGVufDB8fHx8MTc0NzkwNjg0MXww&ixlib=rb-4.1.0&q=80&w=400", category: "Nutrition Basics", aiHint: "protein food" },
  { id: "3", title: "Healthy Snacking Ideas", summary: "Find delicious and nutritious snack ideas to keep you energized between meals.", imageUrl: "https://images.unsplash.com/photo-1474859569645-e0def92b02bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxN3x8SGVhbHRoeSUyMFNuYWNraW5nJTIwSWRlYXN8ZW58MHx8fHwxNzQ3OTA2ODY4fDA&ixlib=rb-4.1.0&q=80&w=400", category: "Healthy Eating", aiHint: "healthy snacks" },
  { id: "4", title: "Mindful Eating Techniques", summary: "Explore how mindful eating can improve your relationship with food and aid digestion.", imageUrl: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxNaW5kZnVsJTIwRWF0aW5nJTIwVGVjaG5pcXVlc3xlbnwwfHx8fDE3NDc5MDY4OTR8MA&ixlib=rb-4.1.0&q=80&w=400", category: "Wellness", aiHint: "mindful meditation" },
];
