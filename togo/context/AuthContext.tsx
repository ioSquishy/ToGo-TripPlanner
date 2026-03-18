"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { saveUser } from "@/lib/db";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const u = result.user;

      // Ensure Firestore sees an authenticated token before first write.
      await u.getIdToken(true);

      await saveUser(u.uid, u.displayName ?? "", u.email ?? "", u.photoURL ?? "");
    } catch (error) {
      // warn because they could've just closed the modal
      console.warn("Google sign-in failed:", error);
      return;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Failed to log out.");
      alert("Failed to log out.");
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}