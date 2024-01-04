"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dashboard } from "../../view/dashboard";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const userData = localStorage.getItem("userData");
    if (!userData) {
      router.push("/not-found");
      return;
    }
    let user = JSON.parse(userData);
    if (user?.roles === "creator_completed") {
      router.push("/creator/dashboard");
      return;
    }
    setLoading(false);
  }, []);

  return loading ? <>Loading...</> : <Dashboard />;
}
