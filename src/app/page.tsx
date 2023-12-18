"use client";

import { Dashboard } from "../../view/dashbaord";
import PageLayout from "./layout/page";

export default function Home() {
  return (
    <>
      <PageLayout>
        <Dashboard />
      </PageLayout>
    </>
  );
}
