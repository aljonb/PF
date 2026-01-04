'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addTodo(formData: FormData) {
  const title = formData.get('title') as string;
  
  const supabase = await createClient();
  await supabase.from('todos').insert({ title });
  
  revalidatePath('/');
}

export async function deleteTodo(id: string) {
  const supabase = await createClient();
  await supabase.from('todos').delete().eq('id', id);
  
  revalidatePath('/');
}

export async function toggleTodo(id: string, currentState: boolean) {
  const supabase = await createClient();
  await supabase.from('todos').update({ is_complete: !currentState }).eq('id', id);
  
  revalidatePath('/');
}