import { ChatInterface } from "@/components/chat-interface";

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">AI Chat Assistant</h1>
        <p className="text-muted-foreground">
          Get instant answers to your diet and nutrition questions.
        </p>
      </header>
      <ChatInterface />
    </div>
  );
}
