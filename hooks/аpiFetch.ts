import { toast } from "sonner";

export async function аpiFetch<T>(
  url: string,
  options?: RequestInit,
  errorMessage ="An error occurred while fetching data"
):Promise<T | null>{
  try {
    const res = await fetch(url,{
      headers: {"Content-Type": "application/json"},
      ...options
    })
    const data = await res.json();
    if(!res.ok){
      throw new Error(data?.error || errorMessage);
    }

    return data
  } catch (error: any) {
    toast.error(error?.message || errorMessage);
    return null;
  }
}