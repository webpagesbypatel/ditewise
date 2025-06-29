"use client"

import { ProfileForm } from "@/components/forms/profile-form";
import { motion } from "framer-motion";
import { UserCircle, Shield, Sparkles } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="responsive-spacing">
      {/* Mobile-first header */}
      <motion.div 
        className="mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-yellow-500 shadow-lg">
              <UserCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="responsive-heading text-gray-800">User Profile</h1>
              <p className="text-sm text-gray-600">Manage your health information and dietary preferences</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Security notice for mobile */}
      <motion.div 
        className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-green-100 flex-shrink-0">
            <Shield className="h-4 w-4 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-green-800 text-sm mb-1">Your Data is Secure</h3>
            <p className="text-xs text-green-700 leading-relaxed">
              All health information is encrypted and used only to generate your personalized diet plan.
            </p>
          </div>
        </div>
      </motion.div>

      {/* AI-powered notice */}
      <motion.div 
        className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-blue-100 flex-shrink-0">
            <Sparkles className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-blue-800 text-sm mb-1">AI-Powered Personalization</h3>
            <p className="text-xs text-blue-700 leading-relaxed">
              Our AI analyzes your profile to create a diet plan tailored specifically for your health needs and goals.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Profile form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <ProfileForm />
      </motion.div>
    </div>
  );
}