import { ReduxWrapper } from "@/wrappers/ReduxWrapper";
import { ConfigProvider } from "antd";
import { getCookie } from "cookies-next";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import { Suspense } from "react";
import PageLayout from "../../components/Layout";
import "../../style/global.scss";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// const getUserProfile = async (token: string): Promise<UserDetails> => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     next: { revalidate: 10 },
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error(res.statusText);
//   return data ?? {};
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie("token", { cookies });
  // const userDetails = await getUserProfile(token as string);

  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxWrapper>
          <Suspense fallback={<>loading...</>}>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: "var(--font-poppins)",
                  colorPrimary: "#f0870f",
                  colorText: "rgba(0,0,0,.85)",
                },
                components: {
                  Table: {
                    padding: 20,
                    borderRadius: 0,
                  },
                  Pagination: {
                    colorText: "red",
                  },

                  Input: {
                    colorBorder: "#ced0d4",
                    borderRadius: 4,
                    fontSize: 16,
                    colorPrimaryText: "#424242",
                    colorTextPlaceholder: "rgb(117, 117, 117)",
                  },
                  DatePicker: {
                    colorBorder: "#ced0d4",
                    borderRadius: 4,
                    fontSize: 16,
                    colorPrimaryText: "#424242",
                    colorTextPlaceholder: "rgb(117, 117, 117)",
                  },
                  Select: {
                    colorBorder: "#ced0d4",
                    borderRadius: 4,
                    fontSize: 16,
                    colorPrimaryText: "#424242",
                    colorTextPlaceholder: "rgb(117, 117, 117)",
                  },

                  Breadcrumb: {
                    linkColor: "blue",
                  },
                },
              }}
            >
              <PageLayout>{children}</PageLayout>
            </ConfigProvider>
          </Suspense>
        </ReduxWrapper>
      </body>
    </html>
  );
}
