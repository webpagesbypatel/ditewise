"use client"

import { useState } from "react";
import { GoalItem } from "@/components/goal-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Target } from "lucide-react";
import type { Goal } from "@/types";
import { useToast } from "@/hooks/use-toast";


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

  // Form state for new/edit goal
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
      isAchieved: false, // Reset on edit/add
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

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Health Goals</h1>
            <p className="text-muted-foreground">
            Set, track, and achieve your dietary and wellness objectives.
            </p>
        </div>
        <Button onClick={openAddNewDialog}>
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Goal
        </Button>
      </header>

      {goals.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map(goal => (
            <GoalItem key={goal.id} goal={goal} onEdit={handleEdit} onDelete={handleDelete} onMarkComplete={handleMarkComplete} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-10 shadow-md">
            <CardHeader>
                <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4"/>
                <CardTitle>No Goals Yet!</CardTitle>
                <CardDescription>Start your wellness journey by setting your first goal.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={openAddNewDialog}>
                    <PlusCircle className="mr-2 h-5 w-5" /> Set Your First Goal
                </Button>
            </CardContent>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { if(!isOpen) resetFormAndCloseDialog(); else setIsDialogOpen(true);}}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingGoal ? "Edit Goal" : "Add New Goal"}</DialogTitle>
            <DialogDescription>
              {editingGoal ? "Update the details of your goal." : "Define a new goal to work towards."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input id="description" value={description} onChange={e => setDescription(e.target.value)} className="col-span-3" placeholder="e.g., Drink more water" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="target" className="text-right">Target</Label>
              <Input id="target" value={target.toString()} onChange={e => setTarget(e.target.value)} className="col-span-3" placeholder="e.g., 8 or Complete" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current" className="text-right">Current</Label>
              <Input id="current" value={current.toString()} onChange={e => setCurrent(e.target.value)} className="col-span-3" placeholder="e.g., 2 or Not Started (optional for new)" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">Unit</Label>
              <Input id="unit" value={unit} onChange={e => setUnit(e.target.value)} className="col-span-3" placeholder="e.g., kg, steps, glasses (optional)" />
            </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={resetFormAndCloseDialog}>Cancel</Button>
            <Button type="submit">{editingGoal ? "Save Changes" : "Add Goal"}</Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
