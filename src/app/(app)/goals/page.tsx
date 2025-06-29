"use client"

import { useState } from "react";
import { GoalItem } from "@/components/goal-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Target, Trophy, TrendingUp } from "lucide-react";
import type { Goal } from "@/types";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { motion } from "framer-motion";

const initialGoals: Goal[] = [
  { id: "1", description: "Lose 5kg body weight", target: 5, current: 2, unit: "kg", isAchieved: false },
  { id: "2", description: "Walk 10,000 steps daily", target: 10000, current: 7500, unit: "steps", isAchieved: false },
  { id: "3", description: "Drink 8 glasses of water daily", target: 8, current: 8, unit: "glasses", isAchieved: true },
  { id: "4", description: "Log meals for 7 consecutive days", target: "Complete", current: "In Progress", unit: "", isAchieved: false },
];

export default function GoalsPage() {
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const [description, setDescription] = useState("");
  const [target, setTarget] = useState<string | number>("");
  const [current, setCurrent] = useState<string | number>("");
  const [unit, setUnit] = useState("");

  const handleEdit = (goalId: string) => {
    const goalToEdit = goals.find(g => g.id === goalId);
    if (goalToEdit) {
      setEditingGoal(goalToEdit);
      setDescription(goalToEdit.description);
      setTarget(goalToEdit.target);
      setCurrent(goalToEdit.current);
      setUnit(goalToEdit.unit);
      setIsDialogOpen(true);
    }
  };

  const handleDelete = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId));
    toast({ title: "Goal Deleted", description: "The goal has been removed." });
  };
  
  const handleMarkComplete = (goalId: string) => {
    setGoals(goals.map(g => g.id === goalId ? { ...g, isAchieved: true, current: g.target } : g));
    toast({ title: "Goal Achieved!", description: "Congratulations on completing your goal!" });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !target.toString().trim()) {
      toast({ title: "Error", description: "Description and target are required.", variant: "destructive"});
      return;
    }

    const newGoal: Goal = {
      id: editingGoal ? editingGoal.id : Date.now().toString(),
      description,
      target: typeof target === 'string' && !isNaN(parseFloat(target)) ? parseFloat(target) : target,
      current: typeof current === 'string' && !isNaN(parseFloat(current)) ? parseFloat(current) : (typeof target === 'number' ? 0 : "Not Started"),
      unit,
      isAchieved: false,
    };

    if (editingGoal) {
      setGoals(goals.map(g => g.id === newGoal.id ? newGoal : g));
      toast({ title: "Goal Updated", description: `"${newGoal.description}" has been updated.` });
    } else {
      setGoals([...goals, newGoal]);
      toast({ title: "Goal Added", description: `New goal "${newGoal.description}" created.` });
    }
    resetFormAndCloseDialog();
  };
  
  const resetFormAndCloseDialog = () => {
    setDescription("");
    setTarget("");
    setCurrent("");
    setUnit("");
    setEditingGoal(null);
    setIsDialogOpen(false);
  }

  const openAddNewDialog = () => {
    setEditingGoal(null);
    setDescription("");
    setTarget("");
    setCurrent("");
    setUnit("");
    setIsDialogOpen(true);
  }

  const achievedGoals = goals.filter(g => g.isAchieved).length;
  const totalGoals = goals.length;

  return (
    <div className="responsive-spacing">
      {/* Mobile-first header with stats */}
      <motion.div 
        className="mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-yellow-500 shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="responsive-heading text-gray-800">Your Health Goals</h1>
                <p className="text-sm text-gray-600">Set, track, and achieve your wellness objectives</p>
              </div>
            </div>
            <Button 
              onClick={openAddNewDialog} 
              className="button-responsive bg-gradient-to-r from-primary to-yellow-500 hover:from-yellow-500 hover:to-primary text-white shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <PlusCircle className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" /> 
              Add New Goal
            </Button>
          </div>

          {/* Progress overview */}
          {totalGoals > 0 && (
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Achieved</span>
                </div>
                <p className="text-lg font-bold text-green-700">{achievedGoals}</p>
              </div>
              
              <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">In Progress</span>
                </div>
                <p className="text-lg font-bold text-blue-700">{totalGoals - achievedGoals}</p>
              </div>
              
              <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">Success Rate</span>
                </div>
                <p className="text-lg font-bold text-purple-700">
                  {totalGoals > 0 ? Math.round((achievedGoals / totalGoals) * 100) : 0}%
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Goals grid */}
      {goals.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GoalItem 
                goal={goal} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
                onMarkComplete={handleMarkComplete} 
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="text-center py-10 shadow-md card-responsive">
            <CardHeader>
              <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4"/>
              <CardTitle className="responsive-text">No Goals Yet!</CardTitle>
              <CardDescription className="responsive-text">Start your wellness journey by setting your first goal.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 touch-spacing">
              <Image 
                src="https://placehold.co/300x200.png" 
                alt="Achieving goals illustration" 
                width={300} 
                height={200} 
                className="rounded-lg object-cover shadow-sm mb-4 max-w-full h-auto"
                data-ai-hint="target goal"
              />
              <Button 
                onClick={openAddNewDialog} 
                className="button-responsive bg-gradient-to-r from-primary to-yellow-500 hover:from-yellow-500 hover:to-primary text-white shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <PlusCircle className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" /> 
                Set Your First Goal
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Goal form dialog - Mobile optimized */}
      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { if(!isOpen) resetFormAndCloseDialog(); else setIsDialogOpen(true);}}>
        <DialogContent className="sm:max-w-[425px] mx-4 rounded-xl">
          <DialogHeader>
            <DialogTitle className="responsive-text">{editingGoal ? "Edit Goal" : "Add New Goal"}</DialogTitle>
            <DialogDescription className="responsive-text">
              {editingGoal ? "Update the details of your goal." : "Define a new goal to work towards."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="grid gap-4 py-4 form-responsive">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Input 
                id="description" 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="e.g., Drink more water"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target" className="text-sm font-medium">Target</Label>
              <Input 
                id="target" 
                value={target.toString()} 
                onChange={e => setTarget(e.target.value)} 
                placeholder="e.g., 8 or Complete"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current" className="text-sm font-medium">Current</Label>
              <Input 
                id="current" 
                value={current.toString()} 
                onChange={e => setCurrent(e.target.value)} 
                placeholder="e.g., 2 or Not Started (optional for new)"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit" className="text-sm font-medium">Unit</Label>
              <Input 
                id="unit" 
                value={unit} 
                onChange={e => setUnit(e.target.value)} 
                placeholder="e.g., kg, steps, glasses (optional)"
                className="w-full"
              />
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={resetFormAndCloseDialog} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-primary to-yellow-500 hover:from-yellow-500 hover:to-primary text-white">
                {editingGoal ? "Save Changes" : "Add Goal"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}