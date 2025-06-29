"use client"

import { ChatInterface } from "@/components/chat-interface";
import { motion } from "framer-motion";
import { Brain, MessageCircle, Sparkles } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="responsive-spacing">
      {/* Mobile-first header */}
      <motion.div 
        className="mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-yellow-500 shadow-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <h1 className="responsive-heading text-gray-800">AI Chat Assistant</h1>
              <p className="text-sm text-gray-600">Get instant answers to your diet and nutrition questions</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Feature highlights for mobile */}
      <motion.div 
        className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <MessageCircle className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Instant Answers</span>
          </div>
          <p className="text-xs text-blue-700">Get immediate responses to nutrition questions</p>
        </div>
        
        <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Brain className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Personalized</span>
          </div>
          <p className="text-xs text-green-700">Advice tailored to your diet plan and profile</p>
        </div>
        
        <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Smart</span>
          </div>
          <p className="text-xs text-purple-700">AI-powered nutrition expertise</p>
        </div>
      </motion.div>

      {/* Chat interface */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ChatInterface />
      </motion.div>

      {/* Mobile tips */}
      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="font-semibold text-yellow-800 text-sm mb-2">💡 Chat Tips</h3>
        <ul className="text-xs text-yellow-700 space-y-1">
          <li>• Ask about specific foods: "Is quinoa good for weight loss?"</li>
          <li>• Get meal suggestions: "What's a healthy breakfast for diabetics?"</li>
          <li>• Understand your diet plan: "Why do I need more protein?"</li>
        </ul>
      </motion.div>
    </div>
  );
}