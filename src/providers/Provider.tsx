import Layouts from "@/layouts/Layouts";
import { ReactNode } from "react";
import ReduxProvider from "./ReduxProvider";

const Provider = async ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider>
      <Layouts>{children}</Layouts>
    </ReduxProvider>
  );
};

export default Provider;
