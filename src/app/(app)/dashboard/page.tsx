import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Activity, Apple, BarChart3, Heart, MessageCircle, NotebookText, Target, Users } from "lucide-react";
import Image from "next/image";

const QuickActionCard = ({ title, description, href, icon: Icon }: { title: string, description: string, href: string, icon: React.ElementType }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 group">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
      <Icon className="h-6 w-6 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Button asChild variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:animate-pulse-glow focus:animate-pulse-glow">
        <Link href={href}>Go to {title}</Link>
      </Button>
    </CardContent>
  </Card>
);

const StatCard = ({ title, value, icon: Icon, change, changeType }: { title: string, value: string, icon: React.ElementType, change?: string, changeType?: 'positive' | 'negative' }) => (
  <Card className="shadow-md">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {change && (
        <p className={`text-xs ${changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
          {change} from last week
        </p>
      )}
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Card className="bg-card/50 shadow-xl border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight text-primary">Welcome to DietWise!</CardTitle>
          <CardDescription className="text-lg text-foreground/80">
            Your personalized AI-powered guide to healthier eating and living. Let&apos;s achieve your wellness goals together.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-6">
          <p className="flex-1 text-muted-foreground">
            Start by completing your profile to get a personalized diet plan, log your meals to track your progress, 
            or explore our resources to learn more about nutrition.
          </p>
          <Image 
            src="https://placehold.co/250x160.png" 
            alt="Healthy food illustration" 
            width={250} 
            height={160} 
            className="rounded-lg object-cover shadow-md"
            data-ai-hint="healthy food" 
          />
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard title="My Profile" description="Update your health information." href="/profile" icon={Heart} />
          <QuickActionCard title="Log Meal" description="Track your daily food intake." href="/food-log" icon={Apple} />
          <QuickActionCard title="View Diet Plan" description="Check your personalized plan." href="/diet-plan" icon={NotebookText} />
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Progress Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Calories Today" value="1,850" icon={Activity} change="+200" changeType="negative" />
          <StatCard title="Active Goals" value="3" icon={Target} />
          <StatCard title="Weight" value="70 kg" icon={BarChart3} change="-0.5 kg" changeType="positive" />
          <StatCard title="Community Posts" value="12" icon={Users} />
        </div>
         <div className="mt-4 text-center">
            <Button variant="outline" asChild>
              <Link href="/progress">View Detailed Progress</Link>
            </Button>
          </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg group">
          <CardHeader>
            <CardTitle className="text-xl">AI Chat Assistant</CardTitle>
            <CardDescription>Have questions about your diet or nutrition? Ask our AI assistant.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full group-hover:animate-pulse-glow focus:animate-pulse-glow">
              <Link href="/chat"><MessageCircle className="mr-2 h-4 w-4" /> Start Chatting</Link>
            </Button>
          </CardContent>
        </Card>
         <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Learn Something New</CardTitle>
            <CardDescription>Explore articles on nutrition, healthy recipes, and managing health conditions.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button variant="secondary" asChild className="w-full">
              <Link href="/learn">Go to Learning Library</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

    </div>
  );
}
