import { getAuth, signInWithCustomToken } from "firebase/auth";
import { app } from './firebase.config';
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

// Get Firebase Auth instance
const auth = getAuth(app);

// Custom hook to connect Clerk with Firebase Auth
export function useFirebaseAuth() {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If no user is logged in with Clerk, we don't need to do anything
    if (!userId) {
      setLoading(false);
      return;
    }

    const signInToFirebase = async () => {
      try {
        setLoading(true);
        // Get a JWT from Clerk
        const token = await getToken({ template: 'firebase' });
        
        // If we have a token, sign in to Firebase
        if (token) {
          await signInWithCustomToken(auth, token);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error signing in to Firebase: ", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    };

    signInToFirebase();
  }, [getToken, userId]);

  return { loading, error };
}

export { auth }; 