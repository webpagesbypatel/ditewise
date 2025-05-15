import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit3, Target, Trash2 } from "lucide-react";
import type { Goal } from "@/types";

interface GoalItemProps {
  goal: Goal;
  onEdit: (goalId: string) => void;
  onDelete: (goalId: string) => void;
  onMarkComplete?: (goalId: string) => void; // Optional, for boolean goals
}

export function GoalItem({ goal, onEdit, onDelete, onMarkComplete }: GoalItemProps) {
  const progressValue = typeof goal.current === 'number' && typeof goal.target === 'number' && goal.target > 0 
                        ? Math.min((goal.current / goal.target) * 100, 100) 
                        : goal.isAchieved ? 100 : 0;
  const isCompleted = goal.isAchieved || (typeof progressValue === 'number' && progressValue >= 100);

  return (
    <Card className={`shadow-md hover:shadow-lg transition-shadow ${isCompleted ? 'bg-green-50 dark:bg-green-900/30 border-green-500' : ''}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Target className={`w-5 h-5 ${isCompleted ? 'text-green-600' : 'text-primary'}`} />
            {goal.description}
          </CardTitle>
          <CardDescription className="text-sm">
            Target: {goal.target} {goal.unit}
          </CardDescription>
        </div>
        {isCompleted && <CheckCircle className="w-6 h-6 text-green-600" />}
      </CardHeader>
      <CardContent>
        {!isCompleted && typeof goal.current === 'number' && (
          <>
            <p className="text-sm text-muted-foreground mb-1">Current: {goal.current} {goal.unit}</p>
            <Progress value={progressValue} aria-label={`${goal.description} progress`} className="mb-3" />
          </>
        )}
        {isCompleted && <p className="text-sm text-green-700 dark:text-green-400 font-medium">Goal Achieved!</p>}
        
        <div className="flex justify-end space-x-2 mt-3">
          {!isCompleted && onMarkComplete && typeof goal.target !== 'number' && ( // For boolean type goals
             <Button variant="outline" size="sm" onClick={() => onMarkComplete(goal.id)}>
                <CheckCircle className="mr-1 h-4 w-4" /> Mark Complete
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => onEdit(goal.id)} className="h-8 w-8">
            <Edit3 className="h-4 w-4" />
            <span className="sr-only">Edit Goal</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(goal.id)} className="h-8 w-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete Goal</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
