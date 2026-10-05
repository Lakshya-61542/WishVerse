import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-violet-50 p-10">

      <h1 className="text-4xl font-black text-slate-900">
        Welcome to WishVerse ✨
      </h1>

      <p className="mt-3 text-slate-600">
        Signed in as {user?.email}
      </p>

      <button
        onClick={signOut}
        className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-white"
      >
        Sign Out
      </button>

    </div>
  );
}