import { ArticleCard, placeholderArticles } from "@/components/article-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function LearnPage() {
  // In a real app, articles would be fetched and filterable
  const articles = placeholderArticles;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Learning Library</h1>
        <p className="text-muted-foreground">
          Explore reliable information about chronic diseases, nutrition, and healthy eating.
        </p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search articles..." className="pl-10 w-full max-w-md" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {/* Add pagination if many articles */}
    </div>
  );
}
