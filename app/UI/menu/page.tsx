import { ComposePost, PostCard, type Post } from '@/app/UI/components'

// Mock data - will be replaced with Supabase queries
const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Jane Developer',
      username: 'janedev',
    },
    content: 'Just launched my first Next.js 16 app with Supabase! The developer experience is incredible 🚀',
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    likes: 42,
    comments: 5,
    reposts: 3,
  },
  {
    id: '2',
    author: {
      name: 'Alex Builder',
      username: 'alexbuilds',
    },
    content: 'TypeScript tip of the day:\n\nUse `satisfies` operator when you want type checking without widening.\n\nconst config = {\n  port: 3000,\n  host: "localhost"\n} satisfies Config;',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 128,
    comments: 12,
    reposts: 24,
  },
  {
    id: '3',
    author: {
      name: 'Sam Designer',
      username: 'samdesigns',
    },
    content: 'Tailwind CSS v4 is a game changer. The new features make building responsive UIs so much faster! What are your favorite new additions?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    likes: 89,
    comments: 23,
    reposts: 8,
  },
]

export default function MenuPage() {
  return (
    <>
      {/* Page header */}
      <header className="sticky top-16 z-10 backdrop-blur-md bg-background/80 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Home</h1>
        </div>
        
        {/* Feed tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <button className="flex-1 py-4 text-center font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
            For you
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#6c47ff] rounded-full" />
          </button>
          <button className="flex-1 py-4 text-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            Following
          </button>
        </div>
      </header>

      {/* Compose Post */}
      <ComposePost />

      {/* Feed */}
      <div>
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}
