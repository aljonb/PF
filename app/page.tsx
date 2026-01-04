import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';


// Server Actions
async function addTodo(formData: FormData): Promise<void> {
  'use server'
  const title = formData.get('title') as string;
  
  const supabase = await createClient();
  await supabase.from('todos').insert({ title });
  
  revalidatePath('/');
}

async function toggleTodo(id: string, currentState: boolean): Promise<void> {
  'use server'
  const supabase = await createClient();
  await supabase.from('todos').update({ is_complete: !currentState }).eq('id', id);
  
  revalidatePath('/');
}

async function deleteTodo(id: string): Promise<void> {
  'use server'
  const supabase = await createClient();
  await supabase.from('todos').delete().eq('id', id);
  
  revalidatePath('/');
}

// Page Component
export default async function Home() {
  const supabase = await createClient();
  const { data: todos } = await supabase.from('todos').select('*');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      
      <form action={addTodo} className="mb-4">
        <input 
          type="text" 
          name="title" 
          placeholder="Add a new todo"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add
        </button>
      </form>

      <ul>
        {todos?.map((todo: any) => (
          <li key={todo.id} className="mb-2">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

