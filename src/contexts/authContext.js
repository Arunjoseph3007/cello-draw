import { useState, createContext, useEffect } from "react";
import { supabase } from "src/lib/supabse";
import axios from "axios";

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
      async (_, session) => {
        setAuth(session?.user ?? null);

        const user = session?.user;

        if (!user) return;

        const userfromDb = await axios.post("/api/auth/signUp", {
          id: user.id,
          photoUrl: user.user_metadata.avatar_url,
          email: user.email,
          name: user.user_metadata.user_name,
        });
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    try {
      const user = await supabase.auth.signIn({
        provider: "github",
      });
    } catch (error) {
      console.log(error);
    }
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
