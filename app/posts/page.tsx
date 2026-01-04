import { createClerkSupabaseServerClient } from '@/utils/supabase/clerk-server';
import { revalidatePath } from 'next/cache';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

async function createPost(formData: FormData) {
    'use server'
    const content = formData.get('content') as string;
    const client = await createClerkSupabaseServerClient();

    await client.from('posts').insert({ content });
    revalidatePath('/posts');
}

export default async function PostsPage() {
    const client = await createClerkSupabaseServerClient();

    const { data: posts, error } = await client.from('posts').select('*').order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Posts</h1>
            </div>

            <SignedIn>
                <form action={createPost} className="mb-8 border p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <label className="block mb-2 font-medium">New Post</label>
                    <textarea
                        name="content"
                        placeholder="What's on your mind?"
                        className="w-full p-2 border rounded bg-white dark:bg-black mb-2 text-foreground"
                        rows={3}
                        required
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        Post
                    </button>
                </form>

                <div className="space-y-4">
                    {posts?.map((post: any) => (
                        <div key={post.id} className="border p-4 rounded-lg shadow-sm bg-card text-card-foreground">
                            <p className="text-lg">{post.content}</p>
                            <div className="text-xs text-gray-500 mt-2 flex justify-between">
                                <span>{new Date(post.created_at).toLocaleString()}</span>
                                <span>User: {post.user_id}</span>
                            </div>
                        </div>
                    ))}
                    {posts?.length === 0 && (
                        <p className="text-gray-500 text-center">No posts yet.</p>
                    )}
                </div>
            </SignedIn>

            <SignedOut>
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="mb-4 text-lg">You must be signed in to view and create posts.</p>
                    <SignInButton mode="modal">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition">Sign In</button>
                    </SignInButton>
                </div>
            </SignedOut>
        </div>
    );
}
