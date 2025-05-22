
"use client"

import { useState, useRef, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Brain, User } from "lucide-react"; // Changed Bot to Brain
import type { ChatMessage } from "@/types";
import { aiChatbotAssistantAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

// Placeholder, fetch from user context/state
const userProfileForChat = "User is interested in low-carb vegetarian meals. Has a mild nut allergy.";
const currentDietPlanForChat = "Currently on a 1500 kcal plan, focusing on plant-based proteins and complex carbs.";

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const result = await aiChatbotAssistantAction({
      question: userMessage.text,
      userProfile: userProfileForChat, // Pass relevant user context
      dietPlan: currentDietPlanForChat, // Pass current diet plan if available
    });
    
    setIsLoading(false);

    if ('error' in result) {
        toast({ title: "Chatbot Error", description: result.error, variant: "destructive"});
        const aiErrorMessage: ChatMessage = {
            id: Date.now().toString() + "_error",
            sender: "ai",
            text: "Sorry, I encountered an error. Please try again.",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiErrorMessage]);
    } else if (result && result.answer) {
        const aiMessage: ChatMessage = {
            id: Date.now().toString() + "_ai",
            sender: "ai",
            text: result.answer,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl h-[70vh] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Brain className="text-primary"/> DietWise AI Assistant</CardTitle> {/* Changed Bot to Brain */}
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.sender === "user" ? "justify-end" : ""
                }`}
              >
                {message.sender === "ai" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Brain size={18}/></AvatarFallback> {/* Changed Bot to Brain */}
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.text}
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback><User size={18}/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
                 <div className="flex items-end gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><Brain size={18}/></AvatarFallback> {/* Changed Bot to Brain */}
                    </Avatar>
                    <div className="max-w-[70%] rounded-lg px-4 py-2 text-sm bg-muted animate-pulse">
                        Thinking...
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Ask about your diet, nutrition, recipes..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
