'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addTodo(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get('title') as string;

  const { error } = await supabase
    .from('todos')
    .insert({ title, is_complete: false });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/');
  return { success: true };
}

export async function deleteTodo(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/');
  return { success: true };
}

export async function toggleTodo(id: string, isComplete: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('todos')
    .update({ is_complete: !isComplete })
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/');
  return { success: true };
}