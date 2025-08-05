"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  useEffect(() => {
    console.log("Error in Dashboard:", error);

  }, [error])

  return(
    <div className="text-center py-8">
      <h2 className="text-xl font-semibold text-red-500">Възникна грешка</h2>
      <p className="mb-4">{error.message}</p>
      <button onClick={() => reset()} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
        Презареди
      </button>
    </div>
  )
}
