import { AppError } from "@/lib/errors";

export function withErrorHandling(
  handle: (req: Request) => Promise<Response>
) {
  return async (req: Request) => {
    try {
      return await handle(req);
    } catch (error: unknown) {
      console.log("Error in API handler:", error);

      const status = error instanceof AppError ? error.status : 500;
      const message = error instanceof Error ? error.message : "Internal Server Error";

      return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { "Content-Type": "application/json" }
      })

    }
  }
}