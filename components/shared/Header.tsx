import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Header() {
  const user = await currentUser();
  return (
    <header className="w-full px-4 py-3 bg-white shadow-md flex items-center justify-between flex-wrap">
      <div className="flex items-end gap-3">
        <h1 className="text-2xl font-bold text-blue-600">Budget Tracker</h1>
        <span className="hidden sm:inline-block text-gray-500 text-lg">
          Dashboard
        </span>
      </div>
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <div className="flex flex-col text-right mr-2">
          <p className="text-sm font-medium text-gray-700">
            {user?.firstName}
          </p>
          <p className="text-xs text-gray-500">
            {user?.lastName}
          </p>
        </div>
        <UserButton />
      </div>
    </header>
  );
}