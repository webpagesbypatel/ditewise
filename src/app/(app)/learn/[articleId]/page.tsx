import { placeholderArticles } from "@/components/article-card"; // Using placeholder data
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// This is a simplified version. In a real app, you'd fetch article by ID.
export default function ArticleDetailPage({ params }: { params: { articleId: string } }) {
  const article = placeholderArticles.find(a => a.id === params.articleId);

  if (!article) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold">Article not found</h1>
        <p className="text-muted-foreground">The article you are looking for does not exist.</p>
        <Button variant="link" asChild className="mt-4">
          <Link href="/learn"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning Library</Link>
        </Button>
      </div>
    );
  }
  
  // Placeholder full content
  const fullContent = article.content || `${article.summary}\n\nThis is placeholder content for the full article. In a real application, this section would contain detailed information, research findings, practical tips, and more related to "${article.title}". It might include sections on:\n\n- Causes and risk factors\n- Symptoms and diagnosis\n- Treatment options (including dietary interventions)\n- Lifestyle modifications\n- Scientific evidence supporting the information\n\nFor now, enjoy this extended summary!`;


  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Button variant="outline" asChild size="sm" className="mb-4">
          <Link href="/learn"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Library</Link>
      </Button>
      <Card className="shadow-xl">
        {article.imageUrl && (
          <CardHeader className="p-0 mb-6">
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-t-lg"
              data-ai-hint={article.category}
            />
          </CardHeader>
        )}
        <CardContent className="px-6 pb-6">
          <Badge variant="secondary" className="mb-2">{article.category}</Badge>
          <CardTitle className="text-3xl font-bold mb-2">{article.title}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mb-6">{article.summary}</CardDescription>
          
          <Separator className="my-6" />
          
          <article className="prose dark:prose-invert max-w-none">
            {/* In a real app, this would render Markdown or rich text */}
            {fullContent.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>
        </CardContent>
      </Card>
    </div>
  );
}

// Optional: Generate static paths if you know all article IDs at build time
// export async function generateStaticParams() {
//   return placeholderArticles.map(article => ({
//     articleId: article.id,
//   }));
// }
