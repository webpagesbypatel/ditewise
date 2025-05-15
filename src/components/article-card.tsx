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
            data-ai-hint={article.category}
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
  { id: "1", title: "Understanding Type 2 Diabetes", summary: "Learn about the causes, symptoms, and management of Type 2 Diabetes through diet and lifestyle.", imageUrl: "https://placehold.co/400x200.png", category: "Chronic Diseases" },
  { id: "2", title: "The Power of Protein", summary: "Discover the importance of protein in your diet for muscle health, satiety, and overall wellness.", imageUrl: "https://placehold.co/400x200.png", category: "Nutrition Basics" },
  { id: "3", title: "Healthy Snacking Ideas", summary: "Find delicious and nutritious snack ideas to keep you energized between meals.", imageUrl: "https://placehold.co/400x200.png", category: "Healthy Eating" },
  { id: "4", title: "Mindful Eating Techniques", summary: "Explore how mindful eating can improve your relationship with food and aid digestion.", imageUrl: "https://placehold.co/400x200.png", category: "Wellness" },
];
