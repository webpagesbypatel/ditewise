import { IngredientSwapperForm } from "@/components/forms/ingredient-swapper-form";

export default function IngredientSwapperPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Smart Ingredient Swapper</h1>
        <p className="text-muted-foreground">
          Find the perfect ingredient substitute for your recipes.
        </p>
      </header>
      <IngredientSwapperForm />
    </div>
  );
}
