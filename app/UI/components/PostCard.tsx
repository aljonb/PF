import { formatDistanceToNow } from '../../../utils/dateUtils'

export interface Post {
  id: string
  author: {
    name: string
    username: string
    avatarUrl?: string
  }
  content: string
  createdAt: Date
  likes: number
  comments: number
  reposts: number
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border-b border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6c47ff] to-[#a855f7] flex items-center justify-center text-white font-bold">
            {post.author.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold truncate">{post.author.name}</span>
            <span className="text-gray-500 dark:text-gray-400 truncate">@{post.author.username}</span>
            <span className="text-gray-500 dark:text-gray-400">·</span>
            <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {formatDistanceToNow(post.createdAt)}
            </span>
          </div>

          {/* Post content */}
          <p className="mt-1 text-foreground whitespace-pre-wrap break-words">{post.content}</p>

          {/* Actions */}
          <div className="flex items-center justify-between mt-3 max-w-md">
            <ActionButton icon={<CommentIcon />} count={post.comments} hoverColor="text-blue-500" />
            <ActionButton icon={<RepostIcon />} count={post.reposts} hoverColor="text-green-500" />
            <ActionButton icon={<LikeIcon />} count={post.likes} hoverColor="text-red-500" />
            <ActionButton icon={<ShareIcon />} hoverColor="text-blue-500" />
          </div>
        </div>
      </div>
    </article>
  )
}

interface ActionButtonProps {
  icon: React.ReactNode
  count?: number
  hoverColor: string
}

function ActionButton({ icon, count, hoverColor }: ActionButtonProps) {
  return (
    <button
      className={`flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:${hoverColor} transition-colors group`}
    >
      <span className={`p-2 rounded-full group-hover:bg-opacity-10 group-hover:bg-current`}>
        {icon}
      </span>
      {count !== undefined && <span className="text-sm">{count > 0 ? count : ''}</span>}
    </button>
  )
}

// Icons
function CommentIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}

function RepostIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  )
}

function LikeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  )
}
