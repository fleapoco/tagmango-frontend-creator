"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

export const ReduxWrapper = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>;
};
