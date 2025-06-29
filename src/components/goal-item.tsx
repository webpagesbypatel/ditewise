"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit3, Target, Trash2, Trophy } from "lucide-react";
import type { Goal } from "@/types";
import { motion } from "framer-motion";

interface GoalItemProps {
  goal: Goal;
  onEdit: (goalId: string) => void;
  onDelete: (goalId: string) => void;
  onMarkComplete?: (goalId: string) => void;
}

export function GoalItem({ goal, onEdit, onDelete, onMarkComplete }: GoalItemProps) {
  const progressValue = typeof goal.current === 'number' && typeof goal.target === 'number' && goal.target > 0 
                        ? Math.min((goal.current / goal.target) * 100, 100) 
                        : goal.isAchieved ? 100 : 0;
  const isCompleted = goal.isAchieved || (typeof progressValue === 'number' && progressValue >= 100);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`card-responsive hover:shadow-xl transition-all duration-300 border-0 h-full ${
        isCompleted 
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 ring-2 ring-green-200' 
          : 'bg-gradient-to-br from-white to-gray-50/50'
      }`}>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3 touch-spacing">
          <div className="flex-1 min-w-0">
            <CardTitle className="responsive-text font-semibold flex items-start gap-2 leading-tight">
              <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                isCompleted ? 'bg-green-100' : 'bg-primary/10'
              }`}>
                <Target className={`w-4 h-4 ${isCompleted ? 'text-green-600' : 'text-primary'}`} />
              </div>
              <span className={`${isCompleted ? 'text-green-800' : 'text-gray-800'} break-words`}>
                {goal.description}
              </span>
            </CardTitle>
            <CardDescription className="text-sm mt-2 ml-8">
              Target: <span className="font-medium">{goal.target} {goal.unit}</span>
            </CardDescription>
          </div>
          {isCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Trophy className="w-6 h-6 text-green-600 flex-shrink-0" />
            </motion.div>
          )}
        </CardHeader>
        
        <CardContent className="touch-spacing pt-0">
          {!isCompleted && typeof goal.current === 'number' && (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Current: {goal.current} {goal.unit}</span>
                <span className="font-medium text-primary">{Math.round(progressValue)}%</span>
              </div>
              <Progress 
                value={progressValue} 
                aria-label={`${goal.description} progress`} 
                className="h-2"
              />
            </div>
          )}
          
          {isCompleted && (
            <motion.div 
              className="mb-4 p-3 bg-green-100 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-sm text-green-800 font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Goal Achieved! 🎉
              </p>
            </motion.div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {!isCompleted && onMarkComplete && typeof goal.target !== 'number' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onMarkComplete(goal.id)}
                className="flex-1 sm:flex-none text-xs bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
              >
                <CheckCircle className="mr-1 h-3 w-3" /> 
                Mark Complete
              </Button>
            )}
            
            <div className="flex gap-2 ml-auto">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEdit(goal.id)} 
                className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
              >
                <Edit3 className="h-3 w-3" />
                <span className="sr-only">Edit Goal</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onDelete(goal.id)} 
                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <Trash2 className="h-3 w-3" />
                <span className="sr-only">Delete Goal</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}