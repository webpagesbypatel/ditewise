"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Activity, Apple, BarChart3, Heart, MessageCircle, NotebookText, Target, Users, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const QuickActionCard = ({ title, description, href, icon: Icon, gradient, index }: { 
  title: string, 
  description: string, 
  href: string, 
  icon: React.ElementType, 
  gradient?: string,
  index: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <Card className="card-responsive hover:shadow-2xl transition-all duration-500 group border-0 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 space-y-2 sm:space-y-0 relative">
        <CardTitle className="responsive-text font-bold text-gray-800 order-2 sm:order-1 group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
        <motion.div 
          className={`p-3 rounded-xl ${gradient || 'bg-primary/10'} order-1 sm:order-2 self-center sm:self-auto shadow-md group-hover:shadow-lg transition-all duration-300`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </CardHeader>
      <CardContent className="touch-spacing pt-0 relative z-10">
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>
        <Button asChild variant="default" className="button-responsive bg-gradient-to-r from-primary to-yellow-500 hover:from-yellow-500 hover:to-primary text-white font-medium shadow-md hover:shadow-xl transition-all duration-300 group">
          <Link href={href} className="flex items-center gap-2">
            Go to {title}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

const StatCard = ({ title, value, icon: Icon, change, changeType, index }: { 
  title: string, 
  value: string, 
  icon: React.ElementType, 
  change?: string, 
  changeType?: 'positive' | 'negative',
  index: number
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
  >
    <Card className="card-responsive hover:shadow-xl transition-all duration-300 border-0 bg-white group overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 touch-spacing relative">
        <CardTitle className="text-xs sm:text-sm font-medium text-gray-700 flex-1 group-hover:text-gray-900 transition-colors duration-300">
          {title}
        </CardTitle>
        <motion.div 
          className="p-2 rounded-lg bg-primary/10 flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300"
          whileHover={{ rotate: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardHeader>
      <CardContent className="touch-spacing pt-0 relative z-10">
        <motion.div 
          className="text-xl sm:text-2xl font-bold text-gray-900 mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {value}
        </motion.div>
        {change && (
          <motion.p 
            className={`text-xs flex items-center gap-1 ${changeType === 'positive' ? 'text-green-600' : 'text-red-500'}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TrendingUp className={`h-3 w-3 ${changeType === 'negative' ? 'rotate-180' : ''} transition-transform duration-300`} />
            {change} from last week
          </motion.p>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

export function EnhancedDashboard() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="responsive-spacing">
      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-primary/5 via-yellow-50 to-orange-50 shadow-2xl border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-yellow-400/10 opacity-50" />
          <CardHeader className="touch-spacing relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <motion.div 
                className="p-3 rounded-full bg-gradient-to-br from-primary to-yellow-500 shadow-lg flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </motion.div>
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <CardTitle className="responsive-heading text-gradient mb-2">Welcome to DietWise!</CardTitle>
                  <CardDescription className="responsive-text text-gray-700">
                    Your personalized AI-powered guide to healthier eating and living. Let&apos;s achieve your wellness goals together.
                  </CardDescription>
                </motion.div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="touch-spacing pt-0 relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <motion.p 
                className="flex-1 text-gray-600 leading-relaxed responsive-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Start by completing your profile to get a personalized diet plan, log your meals to track your progress, 
                or explore our resources to learn more about nutrition.
              </motion.p>
              <motion.div 
                className="relative w-full sm:w-auto flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-yellow-400/20 rounded-lg blur-lg" />
                {!imageLoaded && (
                  <div className="relative w-full sm:w-auto max-w-xs mx-auto h-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-lg" />
                )}
                <Image 
                  src="https://images.unsplash.com/photo-1532054241088-402b4150db33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8ZGlldCUyMGltYWdlc3xlbnwwfHx8fDE3NDc5MDY0NDR8MA&ixlib=rb-4.1.0&q=80&w=250" 
                  alt="Person eating a healthy salad" 
                  width={250} 
                  height={160} 
                  className={`relative rounded-lg object-cover shadow-lg border-2 border-white w-full sm:w-auto max-w-xs mx-auto transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  data-ai-hint="eating salad" 
                />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions Section */}
      <section>
        <motion.div 
          className="flex items-center gap-3 mb-4 sm:mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <h2 className="responsive-heading text-gray-800">Quick Actions</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <QuickActionCard 
            title="My Profile" 
            description="Update your health information." 
            href="/profile" 
            icon={Heart}
            gradient="bg-red-100"
            index={0}
          />
          <QuickActionCard 
            title="Log Meal" 
            description="Track your daily food intake." 
            href="/food-log" 
            icon={Apple}
            gradient="bg-green-100"
            index={1}
          />
          <QuickActionCard 
            title="View Diet Plan" 
            description="Check your personalized plan." 
            href="/diet-plan" 
            icon={NotebookText}
            gradient="bg-blue-100"
            index={2}
          />
        </div>
      </section>
      
      {/* Progress Overview Section */}
      <section>
        <motion.div 
          className="flex items-center gap-3 mb-4 sm:mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="p-2 rounded-lg bg-primary/10">
            <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <h2 className="responsive-heading text-gray-800">Your Progress Overview</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Calories Today" value="1,850" icon={Activity} change="+200" changeType="negative" index={0} />
          <StatCard title="Active Goals" value="3" icon={Target} index={1} />
          <StatCard title="Weight" value="70 kg" icon={BarChart3} change="-0.5 kg" changeType="positive" index={2} />
          <StatCard title="Community Posts" value="12" icon={Users} index={3} />
        </div>
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <Button variant="outline" asChild className="button-responsive border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 group">
            <Link href="/progress" className="flex items-center gap-2">
              View Detailed Progress
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* AI Tools Section */}
      <motion.section 
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
      >
        <Card className="card-responsive hover:shadow-2xl transition-all duration-500 group border-0 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="touch-spacing relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <motion.div 
                className="p-2 rounded-lg bg-blue-100 flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </motion.div>
              <div className="flex-1">
                <CardTitle className="responsive-text text-gray-800 mb-1 group-hover:text-blue-700 transition-colors duration-300">
                  AI Chat Assistant
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Have questions about your diet or nutrition? Ask our AI assistant.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="touch-spacing pt-0 relative z-10">
            <Button asChild className="button-responsive bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md hover:shadow-xl transition-all duration-300 group">
              <Link href="/chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" /> 
                Start Chatting
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="card-responsive hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-green-50 to-emerald-50 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="touch-spacing relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <motion.div 
                className="p-2 rounded-lg bg-green-100 flex-shrink-0 group-hover:bg-green-200 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <NotebookText className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </motion.div>
              <div className="flex-1">
                <CardTitle className="responsive-text text-gray-800 mb-1 group-hover:text-green-700 transition-colors duration-300">
                  Learn Something New
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Explore articles on nutrition, healthy recipes, and managing health conditions.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="touch-spacing pt-0 relative z-10">
            <Button variant="secondary" asChild className="button-responsive bg-green-100 text-green-700 hover:bg-green-200 transition-all duration-300 group">
              <Link href="/learn" className="flex items-center gap-2">
                Go to Learning Library
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}