import { createClient } from '@supabase/supabase-js'

export function createClerkSupabaseClient(session: any) {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
        {
            accessToken: async () => {
                return await session?.getToken() || null
            },
        }
    )
}
