// Placeholder data for meals - moved from enhanced-meal-card.tsx to fix server/client component import issues
export const enhancedPlaceholderMeals = [
  { 
    id: "1", 
    name: "Grilled Salmon Salad", 
    description: "Nutrient-packed salad with omega-3 rich salmon, mixed greens, and avocado.", 
    imageUrl: "https://media.istockphoto.com/id/1214416414/photo/barbecued-salmon-fried-potatoes-and-vegetables-on-wooden-background.jpg?s=612x612&w=0&k=20&c=Y8RYbZFcvec-FXMMuoU-qkprC3TUFNiw3Ysoe8Drn6g=", 
    imageHint: "salmon salad", 
    calories: 450, 
    protein: 35, 
    carbs: 20, 
    fat: 25, 
    tags: ["High Protein", "Low Carb", "Omega-3"], 
    type: "Lunch" as const 
  },
  { 
    id: "2", 
    name: "Quinoa & Black Bean Bowl", 
    description: "A hearty vegan bowl full of fiber and plant-based protein with colorful vegetables.", 
    imageUrl: "https://images.unsplash.com/photo-1615865417491-9941019fbc00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxRdWlub2ElMjB8ZW58MHx8fHwxNzQ3OTA2NzIxfDA&ixlib=rb-4.1.0&q=80&w=400", 
    imageHint: "quinoa bowl", 
    calories: 500, 
    protein: 20, 
    carbs: 70, 
    fat: 15, 
    tags: ["Vegan", "High Fiber", "Plant-Based"], 
    type: "Dinner" as const 
  },
  { 
    id: "3", 
    name: "Overnight Oats with Berries", 
    description: "Easy and delicious breakfast, perfect for busy mornings with antioxidant-rich berries.", 
    imageUrl: "https://images.unsplash.com/photo-1613082410785-22292e8426e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxPdmVybmlnaHQlMjBPYXRzJTIwd2l0aCUyMEJlcnJpZXN8ZW58MHx8fHwxNzQ3OTA2NzU3fDA&ixlib=rb-4.1.0&q=80&w=400", 
    imageHint: "oats berries", 
    calories: 350, 
    protein: 15, 
    carbs: 55, 
    fat: 8, 
    tags: ["Vegetarian", "Quick", "High Fiber"], 
    type: "Breakfast" as const 
  },
  { 
    id: "4", 
    name: "Mediterranean Chicken Wrap", 
    description: "Fresh and flavorful wrap with grilled chicken, hummus, and Mediterranean vegetables.", 
    imageUrl: "https://media.istockphoto.com/id/1623063260/photo/chicken-gyros-with-vegetables-french-fries-and-tzatziki-sauce-closeup-on-the-board-on-the.jpg?s=612x612&w=0&k=20&c=b03FYvrqB6srS_RFiyKY2yx-Bnb8uW58DhbBb6C1C_g=", 
    imageHint: "chicken wrap", 
    calories: 420, 
    protein: 30, 
    carbs: 35, 
    fat: 18, 
    tags: ["Mediterranean", "Balanced", "Portable"], 
    type: "Lunch" as const 
  },
  { 
    id: "5", 
    name: "Green Smoothie Bowl", 
    description: "Nutrient-dense smoothie bowl packed with spinach, banana, and topped with fresh fruits.", 
    imageUrl: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxHcmVlbiUyMFNtb290aGllJTIwQm93bHxlbnwwfHx8fDE3NDc5MDY4MTF8MA&ixlib=rb-4.1.0&q=80&w=400", 
    imageHint: "green smoothie bowl", 
    calories: 280, 
    protein: 12, 
    carbs: 45, 
    fat: 8, 
    tags: ["Vegan", "Antioxidants", "Energizing"], 
    type: "Breakfast" as const 
  },
  { 
    id: "6", 
    name: "Lentil Curry with Rice", 
    description: "Warming and satisfying curry with protein-rich lentils and aromatic spices.", 
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxMZW50aWwlMjBDdXJyeSUyMHdpdGglMjBSaWNlfGVufDB8fHx8MTc0NzkwNjgzN3ww&ixlib=rb-4.1.0&q=80&w=400", 
    imageHint: "lentil curry", 
    calories: 380, 
    protein: 18, 
    carbs: 60, 
    fat: 8, 
    tags: ["Vegan", "High Protein", "Comfort Food"], 
    type: "Dinner" as const 
  }
];
