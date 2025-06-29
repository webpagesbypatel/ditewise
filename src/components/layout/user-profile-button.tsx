"use client"

import React from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { LogOut, UserCircle } from "lucide-react"
import Link from "next/link"

export function UserProfileButton() {
  // Placeholder user data
  const user = {
    name: "User Name",
    email: "user@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1640951613773-54706e06851d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx1c2VyJTIwYW5pbWF0ZWR8ZW58MHx8fHwxNzQ3OTA3MDUxfDA&ixlib=rb-4.1.0&q=80&w=100", 
  }
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-primary/10 transition-colors duration-300">
          <Avatar className="h-8 w-8 border-2 border-primary/20">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person avatar" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-yellow-500 text-white font-semibold">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-gray-900">{user.name}</p>
            <p className="text-xs leading-none text-gray-500">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200" />
        <DropdownMenuItem asChild className="hover:bg-primary/5 transition-colors duration-300">
          <Link href="/profile" className="flex items-center text-gray-700">
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-200" />
        <DropdownMenuItem className="hover:bg-red-50 text-red-600 transition-colors duration-300">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          {/* Add logout functionality here */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}