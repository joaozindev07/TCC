import { use, useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'


const publishkey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(auth)"

    if (isSignedIn && !inAuthGroup) {
      router.replace("/mood");
    } else if (!isSignedIn) {
      router.replace("/login");
    }

  }, [isSignedIn])


  return <Slot />
}

export default function RootLayout() {
  const router = useRouter();

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={publishkey}
    >
      <InitialLayout />
    </ClerkProvider>
  );
}