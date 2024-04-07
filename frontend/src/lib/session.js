import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import GoogleProvider from "next-auth/providers/google";
import {
  Signup,
  getExistingUsers,
  login,
} from "../../../backend/src/pocketbase";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (!profile?.email) {
  //       throw new Error("No profile");
  //     }

  //     try {
  //       const existingUsers = await getExistingUsers();
  //       const emailExists = existingUsers.some(
  //         (user) => user.superEmail === session.user.email
  //       );

  //       if (emailExists) {
  //         await login(session.user.email, session.user.email, setIsUserValid);
  //       } else {
  //         await Signup(
  //           session.user.email,
  //           session.user.email,
  //           session.user.email,
  //           session.user.email
  //         );
  //         await login(session.user.email, session.user.email, setIsUserValid);
  //       }

  //       window.location.reload();
  //     } catch (error) {
  //       console.error("Error handling Google sign-in:", error);
  //       // Handle errors here, such as displaying an error message to the user
  //     }

  //     return true;
  //   },
  // },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}

export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/");
  }
}
