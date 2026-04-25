const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000';

type ApiResponse<T> = {
  success?: boolean;
  data?: T;
  meta?: Record<string, unknown>;
  error?: {
    code?: string;
    message?: string;
  };
};

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const json = (await response.json()) as ApiResponse<T> | T;

  if (typeof json === 'object' && json !== null && 'data' in json) {
    return (json as ApiResponse<T>).data as T;
  }

  return json as T;
}
