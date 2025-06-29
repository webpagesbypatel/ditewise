import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Activity, Apple, BarChart3, Heart, MessageCircle, NotebookText, Target, Users, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";

const QuickActionCard = ({ title, description, href, icon: Icon, gradient }: { title: string, description: string, href: string, icon: React.ElementType, gradient?: string }) => (
  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-white to-gray-50/50 hover:scale-105 animate-fade-in">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
      <div className={`p-2 rounded-lg ${gradient || 'bg-primary/10'}`}>
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <Button asChild variant="default" className="w-full bg-gradient-to-r from-primary to-yellow-500 hover:from-yellow-500 hover:to-primary text-white font-medium shadow-md hover:shadow-lg transition-all duration-300">
        <Link href={href}>Go to {title}</Link>
      </Button>
    </CardContent>
  </Card>
);

const StatCard = ({ title, value, icon: Icon, change, changeType }: { title: string, value: string, icon: React.ElementType, change?: string, changeType?: 'positive' | 'negative' }) => (
  <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-0 bg-white animate-scale-in">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {change && (
        <p className={`text-xs flex items-center gap-1 mt-1 ${changeType === 'positive' ? 'text-green-600' : 'text-red-500'}`}>
          <TrendingUp className={`h-3 w-3 ${changeType === 'negative' ? 'rotate-180' : ''}`} />
          {change} from last week
        </p>
      )}
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="bg-gradient-to-br from-primary/5 via-yellow-50 to-orange-50 shadow-xl border-0 animate-slide-up">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-br from-primary to-yellow-500 shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-gradient">Welcome to DietWise!</CardTitle>
              <CardDescription className="text-lg text-gray-700 mt-2">
                Your personalized AI-powered guide to healthier eating and living. Let&apos;s achieve your wellness goals together.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-6">
          <p className="flex-1 text-gray-600 leading-relaxed">
            Start by completing your profile to get a personalized diet plan, log your meals to track your progress, 
            or explore our resources to learn more about nutrition.
          </p>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-yellow-400/20 rounded-lg blur-lg"></div>
            <Image 
              src="https://images.unsplash.com/photo-1532054241088-402b4150db33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8ZGlldCUyMGltYWdlc3xlbnwwfHx8fDE3NDc5MDY0NDR8MA&ixlib=rb-4.1.0&q=80&w=250" 
              alt="Person eating a healthy salad" 
              width={250} 
              height={160} 
              className="relative rounded-lg object-cover shadow-lg border-2 border-white"
              data-ai-hint="eating salad" 
            />
          </div>
        </CardContent>
      </Card>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Quick Actions</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard 
            title="My Profile" 
            description="Update your health information." 
            href="/profile" 
            icon={Heart}
            gradient="bg-red-100"
          />
          <QuickActionCard 
            title="Log Meal" 
            description="Track your daily food intake." 
            href="/food-log" 
            icon={Apple}
            gradient="bg-green-100"
          />
          <QuickActionCard 
            title="View Diet Plan" 
            description="Check your personalized plan." 
            href="/diet-plan" 
            icon={NotebookText}
            gradient="bg-blue-100"
          />
        </div>
      </section>
      
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Your Progress Overview</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Calories Today" value="1,850" icon={Activity} change="+200" changeType="negative" />
          <StatCard title="Active Goals" value="3" icon={Target} />
          <StatCard title="Weight" value="70 kg" icon={BarChart3} change="-0.5 kg" changeType="positive" />
          <StatCard title="Community Posts" value="12" icon={Users} />
        </div>
         <div className="mt-6 text-center">
            <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
              <Link href="/progress">View Detailed Progress</Link>
            </Button>
          </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-800">AI Chat Assistant</CardTitle>
                <CardDescription className="text-gray-600">Have questions about your diet or nutrition? Ask our AI assistant.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md hover:shadow-lg transition-all duration-300">
              <Link href="/chat"><MessageCircle className="mr-2 h-4 w-4" /> Start Chatting</Link>
            </Button>
          </CardContent>
        </Card>
         <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <NotebookText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-800">Learn Something New</CardTitle>
                <CardDescription className="text-gray-600">Explore articles on nutrition, healthy recipes, and managing health conditions.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
             <Button variant="secondary" asChild className="w-full bg-green-100 text-green-700 hover:bg-green-200 transition-all duration-300">
              <Link href="/learn">Go to Learning Library</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

    </div>
  );
}