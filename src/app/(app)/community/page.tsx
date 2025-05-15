
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Users, PlusCircle } from "lucide-react";
import Link from "next/link";
import type { CommunityPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const placeholderPosts: CommunityPost[] = [
  { id: "1", title: "My Favorite Low-Carb Recipes!", author: "Alice B.", timestamp: new Date(Date.now() - 86400000 * 1), content: "Just wanted to share some of my go-to low-carb recipes that have helped me a lot. Hope you enjoy them!", upvotes: 25, commentsCount: 5 },
  { id: "2", title: "Struggling with Sugar Cravings", author: "Bob C.", timestamp: new Date(Date.now() - 86400000 * 2), content: "Hi everyone, I'm finding it really hard to cut down on sugar. Any tips or tricks that worked for you?", upvotes: 12, commentsCount: 8 },
  { id: "3", title: "Celebrating a Small Victory!", author: "Carol D.", timestamp: new Date(Date.now() - 86400000 * 0.5), content: "I managed to stick to my meal plan for a whole week! Feeling proud and motivated.", upvotes: 42, commentsCount: 12 },
];

function PostCard({ post }: { post: CommunityPost }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://placehold.co/100x100.png`} alt={post.author} data-ai-hint="avatar person"/>
            <AvatarFallback>{post.author.substring(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{post.title}</CardTitle>
            <p className="text-xs text-muted-foreground">
              By {post.author} - {post.timestamp.toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex gap-4">
            <span className="flex items-center gap-1"><ThumbsUp className="h-4 w-4"/> {post.upvotes}</span>
            <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4"/> {post.commentsCount}</span>
        </div>
        <Button variant="link" size="sm" asChild>
            <Link href={`/community/post/${post.id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}


export default function CommunityPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2"><Users className="text-primary"/>Community Forum</h1>
            <p className="text-muted-foreground">
            Share experiences, recipes, and support with fellow DietWise users.
            </p>
        </div>
         <Button disabled>
            <PlusCircle className="mr-2 h-5 w-5" /> Create New Post (Coming Soon)
        </Button>
      </header>
      
      <div className="flex gap-2 flex-wrap">
        <Badge variant="default">All Posts</Badge>
        <Badge variant="outline">Recipes</Badge>
        <Badge variant="outline">Support</Badge>
        <Badge variant="outline">Success Stories</Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderPosts.map(post => (
            <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {placeholderPosts.length === 0 && (
         <Card className="text-center py-10 shadow-md">
            <CardHeader>
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4"/>
                <CardTitle>The Community is Quiet</CardTitle>
                <CardDescription>Be the first to share your thoughts or ask a question!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <Image 
                    src="https://placehold.co/400x250.png" 
                    alt="Community discussion illustration" 
                    width={400} 
                    height={250} 
                    className="rounded-lg object-cover shadow-sm mb-4"
                    data-ai-hint="community forum"
                />
                <Button disabled>
                    <PlusCircle className="mr-2 h-5 w-5" /> Start a Discussion (Coming Soon)
                </Button>
            </CardContent>
        </Card>
      )}
      {/* Add pagination if many posts */}
    </div>
  );
}

