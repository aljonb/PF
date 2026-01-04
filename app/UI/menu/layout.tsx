import { Sidebar, RightSidebar } from '@/app/UI/components'

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 mr-0 lg:mr-80">
        <div className="max-w-2xl mx-auto border-x border-gray-200 dark:border-gray-800 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  )
}
