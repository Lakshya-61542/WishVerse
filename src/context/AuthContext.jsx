import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  // CRITICAL:
  // Keep this true until Supabase checks local session.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function initialiseAuth() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error(
            "Initial session error:",
            error
          );
        }

        if (!mounted) return;

        setSession(session ?? null);
        setUser(session?.user ?? null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initialiseAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(
          "AUTH EVENT:",
          event,
          session?.user?.email
        );

        if (!mounted) return;

        setSession(session ?? null);
        setUser(session?.user ?? null);

        /*
         * Important after Google OAuth.
         */
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.error(
        "Sign out error:",
        error
      );
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}