"use client";

import React from "react";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  // let router = useRouter();
  // let currentPath = usePathname();
  // const params = useSearchParams();
  // const [loading, setLoading] = useState<boolean>(false);
  // const refreshToken = params.get("refreshToken");
  // const { authenticateUser, getUserDetails } = useAPI();
  // const [authUser, setAuthUser] = useState<UserDetails | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     if (refreshToken) {
  //       try {
  //         const token = await authenticateUser({ token: refreshToken });
  //         console.log({ token });
  //         if (token) {
  //           setCookie("token", token.jwtToken);
  //           const user = await getUserDetails();
  //           if (user) {
  //             setAuthUser(user);
  //             localStorage.setItem("userData", JSON.stringify(user));
  //             console.log({ user });
  //             router.push(currentPath);
  //           }
  //         }
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [refreshToken]);

  // console.log({ loading });

  // useEffect(() => {
  //   if (refreshToken) return;
  //   if (currentPath.includes("/not-found")) return;

  //   const userData = localStorage.getItem("userData");

  //   if (!userData) router.push("/not-found");

  //   let user;
  //   if (userData) user = JSON.parse(userData);

  //   if (
  //     user?.roles != "creator_completed" &&
  //     currentPath.includes("/creator/")
  //   ) {
  //     router.push("/");
  //   }
  // }, [currentPath]);

  return <>{children}</>;
}
