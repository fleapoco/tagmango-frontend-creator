"use client";

import useAPI from "@/hooks/useApi";
import { setCookie } from "cookies-next";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Dashboard } from "../../view/dashboard";

export default function Home() {
  const params = useSearchParams();
  const refreshToken = params.get("refreshToken");
  const { authenticateUser } = useAPI();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (refreshToken) {
        try {
          const token = await authenticateUser({ token: refreshToken });
          console.log({ token });
          if (token) setCookie("token", token.jwtToken);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      } else {
        notFound();
      }
    };

    fetchData();
  }, [refreshToken]);

  return loading ? <>Loading...</> : <Dashboard />;
}
