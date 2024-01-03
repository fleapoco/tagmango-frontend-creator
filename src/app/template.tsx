"use client";

import useAPI from "@/hooks/useApi";
import { setCookie } from "cookies-next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  let router = useRouter();
  let currentPath = usePathname();
  const params = useSearchParams();
  const refreshToken = params.get("refreshToken");
  const { authenticateUser, getUserDetails } = useAPI();

  useEffect(() => {
    console.log();
    const fetchData = async () => {
      if (refreshToken) {
        try {
          const token = await authenticateUser({ token: refreshToken });
          console.log({ token });
          if (token) {
            setCookie("token", token.jwtToken);
            const user = await getUserDetails();
            if (user) {
              localStorage.setItem("userData", JSON.stringify(user));
              router.push(currentPath);
            }
          }
        } catch (error) {}
      }
    };

    fetchData();
  }, [refreshToken]);

  useEffect(() => {
    console.log(currentPath);
    if (refreshToken) return;
    if (currentPath.includes("/not-found")) return;

    const userData = localStorage.getItem("userData");

    if (!userData) router.push("/not-found");

    let user;
    if (userData) user = JSON.parse(userData);

    if (
      user?.roles != "creator_completed" &&
      currentPath.includes("/creator/")
    ) {
      router.push("/");
    }
  }, [currentPath]);

  return <>{children}</>;
}
