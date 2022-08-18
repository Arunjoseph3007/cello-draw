import { useState, createContext, useEffect } from "react";
import { supabase } from "src/lib/supabse";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState();

  const checkUser = async () => {
    const user = supabase.auth.user();

    setAuth(user);
  };

  useEffect(() => {
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuth(session?.user ?? null);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    const user = await supabase.auth.signIn({
      provider: "github",
    });
    setAuth(user);
  };

  const signOut = async () => {
    await supabase.auth.signOut();

    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ user: auth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
