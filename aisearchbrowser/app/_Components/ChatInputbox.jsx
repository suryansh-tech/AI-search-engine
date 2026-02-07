"use client"

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Atom, ArrowUp, Globe, Paperclip, Mic, Sparkles, ChevronDown, Search, X, Plus, Zap, Cpu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AIModelsOption } from '@/Services/Shared'

const ChatInputbox = () => {
  const [activeTab, setActiveTab] = useState("Search")
  const [selectedModel, setSelectedModel] = useState(AIModelsOption[0])

  // Keyboard shortcuts - Ctrl+I for Search, Ctrl+R for Research
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'KeyI' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setActiveTab("Search")
      }
      if (event.code === 'KeyR' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setActiveTab("Research")
      }
    }

    window.addEventListener("keydown", handleKeyDown, true)
    return () => window.removeEventListener("keydown", handleKeyDown, true)
  }, [])

  return (
    <div className='flex flex-col h-screen items-center justify-center w-full bg-[#0A0A0A]'>
      {/* Banner */}
      <div className='mb-6'>
        <div className='inline-flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-800 bg-[#000000]'>
          <span className='px-2 py-0.5 rounded-2xl text-[11px] font-bold text-[#0BC5B3] bg-[#083A33]'>
            New
          </span>
          <span className='text-[12px] text-[#d3d3d3] font-semibold'>
            Introducing the new v0, built for production apps and sites
          </span>
          <span className='h-4 w-px bg-zinc-700'></span>
          <button className='text-[11px] text-[#d3d3d3] font-semibold hover:text-[#ffffff] transition-colors'>
            Learn More
          </button>
        </div>
      </div>

      {/* Main Heading */}
      <h1 className='text-[40px] font-bold text-[#cdcdcd] mb-8 tracking-tight'>
        What do you want to research?
      </h1>

      {/* Input Container */}
      <div className='w-full max-w-[800px] px-4'>
        <div className='relative bg-[#121212] border border-zinc-800 rounded-2xl overflow-hidden'>
          {/* Input Area */}
          <div className='px-5 pt-5'>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="Search" className="mt-0">
                <textarea 
                  placeholder='Quick answers with web search...'
                  className='w-full font-semibold  bg-transparent text-[#A0A0A0] text-[15px] placeholder:text-[#6c6c6c] outline-none resize-none min-h-[80px] max-h-[200px] leading-relaxed'
                  rows={1}
                />
              </TabsContent>
              <TabsContent value="Research" className="mt-0">
                <textarea 
                  placeholder='Deep research with analysis, citations, and insights...'
                  className='w-full font-semibold  bg-transparent text-[#A0A0A0]  text-[15px] placeholder:text-[#6c6c6c] outline-none resize-none min-h-[80px] max-h-[200px] leading-relaxed'
                  rows={1}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Bottom Bar */}
          <div className='flex items-center justify-between px-5 pb-4'>
            {/* Left Side - Plus and Model Selector */}
            <div className='flex items-center gap-2'>
              {/* Plus Button */}
              <Button 
                variant='ghost' 
                size='sm'
                className='h-7 w-7 p-0 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 rounded-md'
              >
                <Plus className='h-4 w-4' />
              </Button>

              {/* Model Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant='ghost' 
                    size='sm'
                    className='h-7 px-2 text-[#A0A0A0] hover:text-zinc-200 hover:bg-zinc-800/50 rounded-md flex items-center gap-1.5'
                  >
                    <div className='h-4 w-4 rounded bg-zinc-900 flex items-center justify-center'>
                      <Cpu className='h-2.5 w-2.5 text-zinc-300' />
                    </div>
                    <span className='text-[13px] font-semibold'>{selectedModel?.name || 'v0 Mini'}</span>
                    <ChevronDown className='h-3 w-3 text-zinc-500' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="start" 
                  className="w-50 bg-[#121212] border border-zinc-700 text-white p-1"
                >
                  <DropdownMenuGroup>
                    {AIModelsOption.map((model, index) => (
                      <DropdownMenuItem 
                        key={index}
                        onClick={() => setSelectedModel(model)}
                        className="px-3 py-1 hover:bg-[#2A2A2A] cursor-pointer rounded focus:bg-[#2A2A2A] "
                      >
                        <div className='flex flex-col'>
                          <span className='text-sm font-medium -pt-0.5 text-[#cccccc]'>{model.name}</span>
                          <span className='text-xs text-zinc-500'>{model.desc}</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className='bg-zinc-800 my-1' />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="px-3 py-1 hover:bg-[#2A2A2A] cursor-pointer rounded focus:bg-[#2A2A2A]">
                      <span className='text-sm font-medium text-[#cccccc]'>Buy Credits</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Right Side - Submit Button */}
            <div className='flex items-center gap-2'>
              {/* Submit Button */}
              <Button 
                size='sm'
                className='h-8 w-8 p-0 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700'
              >
                <ArrowUp className='h-4 w-4 text-zinc-300' />
              </Button>
            </div>
          </div>

          {/* Footer Banner */}
          <div className='px-5 py-3 flex items-center justify-between text-[13px] bg-[#1F1F1F] border-t border-zinc-800'>
            <span className='text-[#A0A0A0] font-semibold flex items-center gap-1.5'> <Zap size={16} /> Upgrade to Pro to unlock unlimited research and advanced features</span>
            <div className='flex items-center gap-4'>
              <button className='text-[#00D9A5] hover:text-[#00F5B8] transition-colors font-medium'>
                Upgrade Plan
              </button>
              <button className='text-zinc-500 hover:text-zinc-300 transition-colors text-lg leading-none'>
                <X className='h-4 w-4' />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Buttons Below with Keyboard Shortcuts */}
        <div className='mt-3 flex items-center justify-center gap-2'>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='bg-transparent border-none p-0 h-auto gap-2'>
              <TabsTrigger 
                value="Search"
                className='data-[state=active]:bg-zinc-800 data-[state=inactive]:bg-transparent border border-zinc-800 hover:text-white data-[state=active]:border-zinc-700 px-3 py-1.5 rounded-md text-[13px] text-[#A0A0A0] data-[state=active]:text-white hover:bg-zinc-800/50 transition-all flex items-center gap-2'
              >
                <Search className='h-3.5 w-3.5' />
                <span>Search</span>
                <div className='flex items-center gap-0.5 ml-1'>
                  <kbd className='px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400 bg-zinc-900 border border-zinc-700 rounded'>
                    Ctrl
                  </kbd>
                  <span className='text-zinc-600 text-xs'>+</span>
                  <kbd className='px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400 bg-zinc-900 border border-zinc-700 rounded'>
                    I
                  </kbd>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="Research"
                className='data-[state=active]:bg-zinc-800 data-[state=inactive]:bg-transparent border border-zinc-800 hover:text-white data-[state=active]:border-zinc-700 px-3 py-1.5 rounded-md text-[13px] text-[#A0A0A0] data-[state=active]:text-white hover:bg-zinc-800/50 transition-all flex items-center gap-2'
              >
                <Atom className='h-3.5 w-3.5' />
                <span>Research</span>
                <div className='flex items-center gap-0.5 ml-1'>
                  <kbd className='px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400 bg-zinc-900 border border-zinc-700 rounded'>
                    Ctrl
                  </kbd>
                  <span className='text-zinc-600 text-xs'>+</span>
                  <kbd className='px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400 bg-zinc-900 border border-zinc-700 rounded'>
                    R
                  </kbd>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ChatInputbox