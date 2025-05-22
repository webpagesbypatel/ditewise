
import { IngredientSwapperForm } from "@/components/forms/ingredient-swapper-form";
import Image from "next/image";
import { Replace } from "lucide-react";

export default function IngredientSwapperPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 p-4 bg-card/50 rounded-lg shadow-md">
        <div className="space-y-1 flex-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2"><Replace className="text-primary h-7 w-7"/>Smart Ingredient Swapper</h1>
          <p className="text-muted-foreground">
            Find the perfect ingredient substitute for your recipes.
          </p>
        </div>
        <Image 
            src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpbmdyZWRpZW50c3xlbnwwfHx8fDE3NDc5MDcyNTF8MA&ixlib=rb-4.1.0&q=80&w=180"
            alt="Assortment of kitchen ingredients" 
            width={180} 
            height={120} 
            className="rounded-lg object-cover shadow-md"
            data-ai-hint="ingredients cooking"
        />
      </header>
      <IngredientSwapperForm />
    </div>
  );
}

