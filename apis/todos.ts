export interface Todos {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const getTodos = async (): Promise<Todos[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  const data = await response.json();

  return data;
}