export interface UserProfile {
  id: string;
  diseases: string;
  medications: string;
  allergies: string;
  preferences: string;
  lifestyle: string;
  anthropometrics: string; // e.g., height, weight, age
  labResults: string;
}

export interface DietPlan {
  dietaryRecommendations: string;
  macroNutrientTargets: string;
  foodSuggestions: string; // Could be an array of FoodItem
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
}

export interface Meal {
  id: string;
  name: string; // e.g., Breakfast, Lunch, Dinner, Snack
  items: FoodItem[];
  date: Date;
}

export interface Goal {
  id: string;
  description: string;
  target: string | number;
  current: string | number;
  unit: string;
  isAchieved: boolean;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  category: string;
  content?: string; // Full content for detail view
}

export interface CommunityPost {
  id: string;
  title: string;
  author: string; // or UserProfile reference
  timestamp: Date;
  content: string;
  upvotes: number;
  commentsCount: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}
