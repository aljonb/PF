'use client'

import { useState } from 'react'

interface ComposePostProps {
  onSubmit?: (content: string) => Promise<void>
  placeholder?: string
}

export default function ComposePost({ 
  onSubmit, 
  placeholder = "What's happening?" 
}: ComposePostProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const maxLength = 280
  const remaining = maxLength - content.length
  const isOverLimit = remaining < 0
  const isEmpty = content.trim().length === 0

  const handleSubmit = async () => {
    if (isEmpty || isOverLimit || isSubmitting) return
    
    setIsSubmitting(true)
    try {
      await onSubmit?.(content)
      setContent('')
    } catch (error) {
      console.error('Failed to post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 p-4">
      <div className="flex gap-3">
        {/* Avatar placeholder */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6c47ff] to-[#a855f7] flex items-center justify-center text-white font-bold">
            U
          </div>
        </div>

        {/* Input area */}
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-xl placeholder-gray-500 dark:placeholder-gray-400 resize-none outline-none min-h-[80px]"
            rows={2}
          />

          {/* Actions bar */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
            {/* Media buttons */}
            <div className="flex gap-1">
              <IconButton label="Add image">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </IconButton>
              <IconButton label="Add GIF">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </IconButton>
              <IconButton label="Add emoji">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </IconButton>
            </div>

            {/* Character count & submit */}
            <div className="flex items-center gap-3">
              {content.length > 0 && (
                <div className={`text-sm ${isOverLimit ? 'text-red-500' : remaining <= 20 ? 'text-yellow-500' : 'text-gray-500'}`}>
                  {remaining}
                </div>
              )}
              <button
                onClick={handleSubmit}
                disabled={isEmpty || isOverLimit || isSubmitting}
                className="bg-[#6c47ff] hover:bg-[#5a3ad9] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-full transition-colors"
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function IconButton({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      title={label}
      className="p-2 rounded-full text-[#6c47ff] hover:bg-[#6c47ff]/10 transition-colors"
    >
      {children}
    </button>
  )
}
