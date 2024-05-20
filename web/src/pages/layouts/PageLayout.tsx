import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PageLayout: React.FC<Props> = ({ children }) => {
  return <div className="container mx-auto p-4">{children}</div>;
};
