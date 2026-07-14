import { redirect } from "next/navigation";

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "";


export const serverFetch = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`);
  return res.json() as Promise<T>;
};


export const serverMutation = async <TResponse, TBody = unknown>(
  path: string,
  data: TBody
): Promise<TResponse> => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  return handleStatus<TResponse>(res);
};

const handleStatus = async <T>(res: Response): Promise<T> => {
  if (res.status === 401) {
    redirect('/unauthorized');
  }
  if (res.status === 403) {
    redirect('/forbidden');
  }
  return res.json() as Promise<T>;
};