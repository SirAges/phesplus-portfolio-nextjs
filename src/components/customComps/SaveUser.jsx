"use client";
import Loading from "@components/customComps/Loading";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { createUser } from "@lib/sanityActions";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast, { useToasterStore } from "react-hot-toast";

const SaveUser = () => {
  const { toasts } = useToasterStore();
  const router = useRouter();
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    const abortController = new AbortController();

    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= 1) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation

    return () => {
      abortController.abort();
    };
  }, [toasts]);

  useEffect(() => {
    const abortController = new AbortController();

    const saveUser = async () => {
      if (user) {
        const newUser = await createUser(user);
        toast.success("New User Created");
        router.push("/dashboard");
      }

      if (newUser !== null || newUser !== undefined) {
        toast.error("Error creating new user");
        router.push("/dashboard");
      }
    };

    saveUser();

    return () => {
      abortController.abort();
    };
  }, []);

  return <Loading text={"Creating new user"} link={""} />;
};
export default SaveUser;
