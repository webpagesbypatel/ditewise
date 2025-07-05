"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Activity, Apple, BarChart3, Heart, MessageCircle, NotebookText, Target, Users, Sparkles, TrendingUp, ArrowRight, Crown, Zap } from "lucide-react";
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
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className="group"
  >
    <Card className="card-luxury hover:shadow-luxury-hover transition-all duration-500 border-0 overflow-hidden relative h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 space-y-3 sm:space-y-0 relative z-10">
        <CardTitle className="responsive-text font-bold text-gray-800 order-2 sm:order-1 group-hover:text-primary transition-colors duration-300 font-serif">
          {title}
        </CardTitle>
        <motion.div 
          className={`p-4 rounded-2xl ${gradient || 'bg-gradient-to-br from-primary to-secondary'} order-1 sm:order-2 self-center sm:self-auto shadow-luxury group-hover:shadow-luxury-hover transition-all duration-300`}
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
        </motion.div>
      </CardHeader>
      
      <CardContent className="touch-spacing pt-0 relative z-10">
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{description}</p>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button asChild variant="default" className="btn-luxury w-full group">
            <Link href={href} className="flex items-center justify-center gap-3">
              <span>Go to {title}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </motion.div>
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
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.03 }}
    className="group"
  >
    <Card className="card-luxury hover:shadow-luxury-hover transition-all duration-300 border-0 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 touch-spacing relative z-10">
        <CardTitle className="text-sm sm:text-base font-medium text-gray-700 flex-1 group-hover:text-gray-900 transition-colors duration-300">
          {title}
        </CardTitle>
        <motion.div 
          className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex-shrink-0 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300 shadow-md"
          whileHover={{ rotate: 15 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </motion.div>
      </CardHeader>
      
      <CardContent className="touch-spacing pt-0 relative z-10">
        <motion.div 
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {value}
        </motion.div>
        {change && (
          <motion.p 
            className={`text-xs flex items-center gap-2 ${changeType === 'positive' ? 'text-emerald-600' : 'text-red-500'}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
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
      {/* Luxury Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-gradient-to-br from-primary/5 via-gold/5 to-rose-gold/5 shadow-luxury-hover border-0 overflow-hidden relative backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-gold/10 opacity-50" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gold/20 to-transparent rounded-full blur-3xl" />
          
          <CardHeader className="touch-spacing relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <motion.div 
                className="p-4 rounded-2xl bg-gradient-to-br from-gold to-rose-gold shadow-luxury flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Crown className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </motion.div>
              
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <CardTitle className="responsive-heading text-gradient mb-3 font-serif">
                    Welcome to DietWise Premium!
                  </CardTitle>
                  <CardDescription className="responsive-text text-gray-700 leading-relaxed">
                    Your personalized AI-powered guide to luxurious, healthy living. Experience premium nutrition guidance 
                    tailored exclusively for your wellness journey.
                  </CardDescription>
                </motion.div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="touch-spacing pt-0 relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-gray-600 leading-relaxed responsive-text mb-6">
                  Begin your transformation with our comprehensive profile builder, track your progress with AI-powered insights, 
                  or explore our curated library of premium nutrition resources.
                </p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button asChild className="btn-luxury group">
                    <Link href="/profile" className="flex items-center gap-2">
                      <Zap className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                      Start Your Journey
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 rounded-xl px-6 py-3">
                    <Link href="/learn" className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Explore Resources
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="relative w-full sm:w-auto flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-rose-gold/20 rounded-2xl blur-xl" />
                {!imageLoaded && (
                  <div className="relative w-full sm:w-auto max-w-sm mx-auto h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-2xl loading-luxury" />
                )}
                <Image 
                  src="https://images.unsplash.com/photo-1532054241088-402b4150db33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8ZGlldCUyMGltYWdlc3xlbnwwfHx8fDE3NDc5MDY0NDR8MA&ixlib=rb-4.1.0&q=80&w=300" 
                  alt="Person eating a healthy salad" 
                  width={300} 
                  height={200} 
                  className={`relative rounded-2xl object-cover shadow-luxury border-2 border-white w-full sm:w-auto max-w-sm mx-auto transition-opacity duration-500 ${
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
          className="flex items-center gap-4 mb-6 sm:mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md">
            <Target className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
          </div>
          <h2 className="responsive-heading text-gray-800 font-serif">Quick Actions</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <QuickActionCard 
            title="My Profile" 
            description="Update your health information and preferences." 
            href="/profile" 
            icon={Heart}
            gradient="bg-gradient-to-br from-red-400 to-pink-500"
            index={0}
          />
          <QuickActionCard 
            title="Log Meal" 
            description="Track your daily nutrition intake with AI insights." 
            href="/food-log" 
            icon={Apple}
            gradient="bg-gradient-to-br from-green-400 to-emerald-500"
            index={1}
          />
          <QuickActionCard 
            title="View Diet Plan" 
            description="Access your personalized nutrition roadmap." 
            href="/diet-plan" 
            icon={NotebookText}
            gradient="bg-gradient-to-br from-blue-400 to-indigo-500"
            index={2}
          />
        </div>
      </section>
      
      {/* Progress Overview Section */}
      <section>
        <motion.div 
          className="flex items-center gap-4 mb-6 sm:mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md">
            <BarChart3 className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
          </div>
          <h2 className="responsive-heading text-gray-800 font-serif">Your Progress Overview</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard title="Calories Today" value="1,850" icon={Activity} change="+200" changeType="negative" index={0} />
          <StatCard title="Active Goals" value="3" icon={Target} index={1} />
          <StatCard title="Weight" value="70 kg" icon={BarChart3} change="-0.5 kg" changeType="positive" index={2} />
          <StatCard title="Community Posts" value="12" icon={Users} index={3} />
        </div>
        
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <Button variant="outline" asChild className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 rounded-xl px-8 py-3 group">
            <Link href="/progress" className="flex items-center gap-3">
              <span>View Detailed Progress</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* AI Tools Section */}
      <motion.section 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <Card className="card-luxury hover:shadow-luxury-hover transition-all duration-500 border-0 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="touch-spacing relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <motion.div 
                className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </motion.div>
              <div className="flex-1">
                <CardTitle className="responsive-text text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300 font-serif">
                  AI Chat Assistant
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Get instant, personalized answers about your nutrition and wellness journey.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="touch-spacing pt-0 relative z-10">
            <Button asChild className="btn-luxury w-full group">
              <Link href="/chat" className="flex items-center justify-center gap-3">
                <MessageCircle className="h-4 w-4" /> 
                <span>Start Chatting</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="card-luxury hover:shadow-luxury-hover transition-all duration-500 border-0 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="touch-spacing relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <motion.div 
                className="p-3 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <NotebookText className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </motion.div>
              <div className="flex-1">
                <CardTitle className="responsive-text text-gray-800 mb-2 group-hover:text-green-700 transition-colors duration-300 font-serif">
                  Premium Learning Library
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Access exclusive articles, recipes, and expert guidance on nutrition and wellness.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="touch-spacing pt-0 relative z-10">
            <Button variant="secondary" asChild className="w-full bg-green-100 text-green-700 hover:bg-green-200 transition-all duration-300 rounded-xl py-3 group border-2 border-green-200 hover:border-green-300">
              <Link href="/learn" className="flex items-center justify-center gap-3">
                <span>Explore Library</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}