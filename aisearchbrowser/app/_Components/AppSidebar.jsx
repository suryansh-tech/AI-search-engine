"use client"

import React, { useState, useEffect } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Compass, CompassIcon, GalleryHorizontalEnd, LogIn, Search, ChevronDown, ChevronRight, Sparkles, MessageSquare, MoreHorizontal } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

const MenuOptions = [
    {
        title: 'Home',
        icons: Search,
        path: '/'
    },
    {
        title: 'Discover',
        icons: CompassIcon,
        path: '/discover'
    },
    {
        title: 'Library',
        icons: GalleryHorizontalEnd,
        path: '/library'
    },
    {
        title: 'Sign In',
        icons: LogIn,
        path: '#'
    },
]

// Hardcoded recent chats (replace with real data later)
const recentChats = [
  { id: 1, title: 'Implement sidebar dar...' },
  { id: 2, title: 'Vittoria.eth website' },
  { id: 3, title: 'Auth page UI' },
]

// Skeleton Loader Component for Recent Items
const RecentItemSkeleton = () => {
  return (
    <div className="flex items-center gap-3 px-3 py-2 animate-pulse">
      <Skeleton className="h-4 w-4 rounded bg-zinc-800" />
      <Skeleton className="h-4 flex-1 rounded bg-zinc-800" />
    </div>
  )
}

const AppSidebar = () => {
  const path = usePathname();
  const [isRecentsOpen, setIsRecentsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state (remove this in production and use real data loading)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading simulation

    return () => clearTimeout(timer);
  }, []);

  return (
    <Sidebar className="border-r border-zinc-800">
      {/* Header with Logo */}
      <SidebarHeader className='bg-[#000000] border-b border-zinc-800'>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" className="h-6 w-auto" />
            <span className="text-white font-semibold tracking-tight">Syrix.AI</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className='bg-[#000000]'>
        {/* New Chat Button - Exact match to reference */}
        <div className="px-3 pt-5 pb-2">
          <button className="w-full flex items-center justify-between px-3 py-2 bg-[#1A1A1A] hover:bg-[#252525] text-white font-normal rounded-md border border-zinc-800 hover:border-zinc-700 transition-all duration-150 shadow-sm">
            <span className="text-[13px] font-medium hover:cursor-pointer">New Chat</span>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
          </button>
        </div>

        {/* Menu Items */}
        <SidebarGroup className="px-3 pt-2">
          <SidebarMenu className="space-y-0.5">
            {MenuOptions.map((menu, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton 
                  asChild 
                  className={`
                    px-3 py-2 rounded-lg
                    transition-all duration-200
                    ${path === menu.path 
                      ? 'bg-zinc-800 text-white font-medium' 
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                    }
                  `}
                >
                  <a href={menu.path} className="flex items-center gap-3">
                    <menu.icons className="h-4 w-4" />
                    <span className="text-sm">{menu.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        
        {/* Recents Section with Skeleton Loader */}
        <SidebarGroup className="px-3 pt-6">
          <button 
            onClick={() => setIsRecentsOpen(!isRecentsOpen)}
            className="flex items-center justify-between w-full mb-2 px-3 py-1 hover:bg-zinc-800/30 rounded transition-colors group"
          >
            <h3 className="text-sm font-medium text-zinc-500 tracking-wider">Recents</h3>
            <ChevronRight 
              className={`h-3 w-3 text-zinc-500 transition-transform duration-300 ease-in-out ${
                isRecentsOpen ? 'rotate-90' : 'rotate-0'
              }`}
            />
          </button>
          
          <div 
            className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${isRecentsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            {/* Show Skeleton Loader when loading */}
            {isLoading ? (
              <div className="space-y-2 py-1">
                <RecentItemSkeleton />
                <RecentItemSkeleton />
                <RecentItemSkeleton />
              </div>
            ) : (
              <SidebarMenu className="space-y-1">
                {recentChats.map((chat, index) => (
                  <SidebarMenuItem 
                    key={chat.id}
                    className="animate-in fade-in slide-in-from-top-2 group/item relative"
                    style={{
                      animationDelay: isRecentsOpen ? `${index * 50}ms` : '0ms',
                      animationDuration: '200ms'
                    }}
                  >
                    <SidebarMenuButton 
                      asChild 
                      className="px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-all duration-200 pr-10"
                    >
                      <a href="#" className="flex items-center gap-3">
                        <MessageSquare className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm truncate">{chat.title}</span>
                      </a>
                    </SidebarMenuButton>

                    {/* Three Dot Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button 
                          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 h-7 w-7 flex items-center justify-center rounded-md hover:bg-zinc-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4 text-zinc-400" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="end"
                        side="right"
                        sideOffset={8}
                        className="w-44 bg-[#1C1C1C] border border-zinc-700 text-white p-1 shadow-xl"
                      >
                        <DropdownMenuItem className="px-3 py-2 text-sm text-zinc-200 hover:bg-[#2A2A2A] cursor-pointer rounded focus:bg-[#2A2A2A] focus:text-white">
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-3 py-2 text-sm text-zinc-200 hover:bg-[#2A2A2A] cursor-pointer rounded focus:bg-[#2A2A2A] focus:text-white">
                          Move...
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-3 py-2 text-sm text-zinc-200 hover:bg-[#2A2A2A] cursor-pointer rounded focus:bg-[#2A2A2A] focus:text-white">
                          Add to Favorites
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-3 py-2 text-sm text-zinc-200 hover:bg-[#2A2A2A] cursor-pointer rounded focus:bg-[#2A2A2A] focus:text-white">
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-3 py-2 text-sm text-red-500 hover:bg-[#2A2A2A] hover:text-red-400 cursor-pointer rounded focus:bg-[#2A2A2A] focus:text-red-400">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </div>

        </SidebarGroup>
      </SidebarContent>

      

      {/* Footer Upgrade Section */}
      <SidebarFooter className='bg-[#000000] border-t border-zinc-800'>
           {/* Sign Up Button */}
        <div className="px-3 pt-3">
          <Button className="w-full bg-[#171717] hover:bg-zinc-700 text-white font-medium rounded-lg h-9 border border-zinc-700">
            Sign Up
          </Button>
        </div>

        <div className='mx-3 my-3 p-4 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl border border-zinc-700'>
          <div className="flex items-start gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-zinc-400 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">Try Now</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Upgrade for image upload, smarter AI & more copilot
              </p>
            </div>
          </div>
          <Button className="w-full mt-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-lg h-8 text-xs">
            Learn More
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar