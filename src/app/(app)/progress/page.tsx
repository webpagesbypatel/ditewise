
import { ProgressChart } from "@/components/progress-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Activity } from "lucide-react";
import Image from "next/image";

// Placeholder summary data
const progressSummary = {
  overallFeeling: "Energetic and Positive",
  goalsAchieved: 3,
  activeStreaks: "5-day meal logging streak",
  biometrics: [
    { name: "Weight", value: "70kg", change: "-2kg last month" },
    { name: "Sleep", value: "7.5h avg", change: "+0.5h last week" },
    { name: "Activity", value: "8,000 steps avg", change: "+1,000 steps last week" },
  ]
};

export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 p-4 bg-card/50 rounded-lg shadow-md">
        <div className="space-y-2 flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
          <p className="text-muted-foreground">
            Visualize your journey towards your health and dietary goals.
          </p>
        </div>
        <Image 
            src="https://placehold.co/200x130.png" 
            alt="Upward trend graph" 
            width={200} 
            height={130} 
            className="rounded-lg object-cover shadow-md"
            data-ai-hint="progress chart"
        />
      </header>

      <Card className="shadow-xl bg-card/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TrendingUp className="text-primary"/>Progress Summary</CardTitle>
          <CardDescription>A quick look at your recent achievements and trends.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg"><strong>Overall Feeling:</strong> {progressSummary.overallFeeling}</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <p className="font-semibold">{progressSummary.goalsAchieved} Goals Achieved</p>
                <p className="text-xs text-muted-foreground">Keep up the great work!</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
              <Activity className="h-6 w-6 text-blue-500" />
              <div>
                <p className="font-semibold">Active Streaks</p>
                <p className="text-xs text-muted-foreground">{progressSummary.activeStreaks}</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Biometrics Overview:</h4>
            <ul className="space-y-1 list-disc list-inside text-sm">
              {progressSummary.biometrics.map(bio => (
                <li key={bio.name}><strong>{bio.name}:</strong> {bio.value} <span className="text-muted-foreground">({bio.change})</span></li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <ProgressChart />
      {/* Add more sections for symptom tracking, etc. */}
    </div>
  );
}

