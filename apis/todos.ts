export interface Todos {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const getTodos = async (): Promise<Todos[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    cache: 'no-store',
  })
  const data = await response.json();

  return data;
}