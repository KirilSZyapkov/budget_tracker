import { AppError } from "@/lib/errors";

export function withErrorHandling(
  handle: (req: Request, ctx: any)=> Promise<Response>
) {
  return async (req: Request, ctx: any)=>{
    try {
      return await handle(req, ctx);
    } catch (error: any) {
      console.log("Error in API handler:", error);

      const status = error instanceof AppError ? error.status : 500;
      const message = error.message || "Internal Server Error";

      return new Response(JSON.stringify({error: message}),{
        status,
        headers: {"Content-Type": "application/json"}
      })
      
    }
  }
}