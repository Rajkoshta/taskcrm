"use client"

import React, { Suspense } from "react"
import { Loader2 } from "lucide-react"

// Lazy load the components
const SuperAdminRoot = React.lazy(() => import("../pages/SuperAdminRootIndex"))
// const Analytics = React.lazy(() => import("./Analytics"))
// const CustomerList = React.lazy(() => import("./CustomerList"))
// const UserSection = React.lazy(() => import("./UserSection"))
// const Profile = React.lazy(() => import("./Profile"))

interface MainContentProps {
  activeTab: string
}

const MainContent: React.FC<MainContentProps> = ({ activeTab }) => {
  const renderComponent = () => {
    switch (activeTab) {
      case "SuperAdminRoot":
        return <SuperAdminRoot />
    //   case "analytics":
    //     return <Analytics />
    //   case "customer-list":
    //     return <CustomerList />
    //   case "user-section":
    //     return <UserSection />
    //   case "profile":
    //     return <Profile />
    //   default:
    //     return <Dashboard />
    }
  }

  return (
    <div className="ml-64 p-8">
      <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>{renderComponent()}</Suspense>
    </div>
  )
}

export default MainContent

