"use client"

import type React from "react"
import { useState } from "react"
import Sidebar from "./Sidebar"
import MainContent from "./MainContent"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("SuperAdminRoot")
  console.log("Current Active Tab:", activeTab);


  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    // You can add logic here to change the content based on the active tab
    console.log("Active tab changed to:", tabId)
  }

  return (
    <div className="flex min-h-screen">
<Sidebar onTabChange={setActiveTab} initialActiveTab={activeTab} />
<MainContent activeTab={activeTab} />
    </div>
  )
}

export default Layout

