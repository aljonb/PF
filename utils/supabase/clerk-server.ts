import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'

export async function createClerkSupabaseServerClient() {
    const { getToken } = await auth();

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
        {
            accessToken: async () => {
                return await getToken()
            },
        }
    )
}
