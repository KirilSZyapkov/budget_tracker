"use client";

export default function Error(){
  return(
    <main className="min-h-screen bg-background px-4 py-20 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Error</h1>
      <p className="mt-4 text-lg md:text-xl text-muted-foreground">
        Something went wrong. Please try again later.
      </p>
    </main>
  )
}