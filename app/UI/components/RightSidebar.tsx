import Link from 'next/link'

interface TrendingTopic {
  category: string
  topic: string
  postCount: string
}

interface SuggestedUser {
  name: string
  username: string
}

// These would come from DB in production
const trendingTopics: TrendingTopic[] = [
  { category: 'Technology', topic: 'Next.js 16', postCount: '12.5K' },
  { category: 'Development', topic: 'TypeScript', postCount: '8.2K' },
  { category: 'Design', topic: 'Tailwind CSS', postCount: '5.1K' },
]

const suggestedUsers: SuggestedUser[] = [
  { name: 'Vercel', username: 'vercel' },
  { name: 'Supabase', username: 'supabase' },
  { name: 'Tailwind CSS', username: 'tailwindcss' },
]

export default function RightSidebar() {
  return (
    <aside className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 p-4 hidden lg:block">
      {/* Search */}
      <div className="relative mb-4">
        <input
          type="search"
          placeholder="Search"
          className="w-full bg-gray-100 dark:bg-gray-800 rounded-full py-3 px-12 outline-none focus:ring-2 focus:ring-[#6c47ff] transition-shadow"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Trending */}
      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl mb-4">
        <h2 className="font-bold text-xl p-4">Trending</h2>
        {trendingTopics.map((item, index) => (
          <Link
            key={index}
            href={`/UI/explore?topic=${encodeURIComponent(item.topic)}`}
            className="block px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.category}</p>
            <p className="font-bold">{item.topic}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.postCount} posts</p>
          </Link>
        ))}
        <Link
          href="/UI/explore"
          className="block p-4 text-[#6c47ff] hover:bg-gray-200 dark:hover:bg-gray-700/50 rounded-b-2xl transition-colors"
        >
          Show more
        </Link>
      </div>

      {/* Who to follow */}
      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl">
        <h2 className="font-bold text-xl p-4">Who to follow</h2>
        {suggestedUsers.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6c47ff] to-[#a855f7] flex items-center justify-center text-white font-bold text-sm">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
              </div>
            </div>
            <button className="bg-foreground text-background font-bold text-sm py-1.5 px-4 rounded-full hover:opacity-80 transition-opacity">
              Follow
            </button>
          </div>
        ))}
        <Link
          href="/UI/explore/users"
          className="block p-4 text-[#6c47ff] hover:bg-gray-200 dark:hover:bg-gray-700/50 rounded-b-2xl transition-colors"
        >
          Show more
        </Link>
      </div>
    </aside>
  )
}
