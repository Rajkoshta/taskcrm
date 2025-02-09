"use client"

import type React from "react"
import { useState } from "react"
import Sidebar from "./Sidebar"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("SuperAdminRoot")

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    // You can add logic here to change the content based on the active tab
    console.log("Active tab changed to:", tabId)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar onTabChange={handleTabChange} initialActiveTab={activeTab} />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  )
}

export default Layout

