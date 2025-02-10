"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Home, PieChart, User, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Home, label: "Dashboard", id: "SuperAdminRoot" },
  { icon: PieChart, label: "Analytics", id: "analytics" },
  { icon: Users, label: "Customer List", id: "customer-list" },
  { icon: Users, label: "User Section", id: "user-section" },
  { icon: User, label: "Profile", id: "profile" },
]

interface SidebarProps {
  onTabChange?: (tabId: string) => void
  initialActiveTab?: string
}

const Sidebar: React.FC<SidebarProps> = ({ onTabChange, initialActiveTab = "SuperAdminRoot" }) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    // Safely access localStorage on the client side
    setUserRole(localStorage.getItem("userRole"))
  }, [])

  const filteredMenuItems = menuItems.filter((item) => {
    if (userRole === "User") {
      return !["User Section"].includes(item.label)
    }
    return true
  })

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);  // Updates local state
    if (onTabChange) {
      onTabChange(tabId);  // Updates parent state
    }
  };
  

  return (
    <div className="fixed left-0 top-0 h-full w-64 glass-card border-r border-white/10">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary">MBG Card</h2>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id

              return (
                <li key={item.id}>
                  <button
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left",
                      "hover:bg-white/10",
                      isActive ? "bg-white/10" : "text-secondary",
                    )}
                    onClick={() => handleTabClick(item.id)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 mt-auto">
          <div className="flex items-center gap-3 px-4 py-3">
            <User className="h-8 w-8 rounded-full bg-accent p-1" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-secondary">{userRole}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

