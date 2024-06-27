import { PropsWithChildren } from "react";
import classnames from "classnames";

type Variants =
  | "label"
  | "link"
  | "meta"
  | "error"
  | "title"
  | "highlight"
  | "caption"
  | "body"
  | "heading"
  | "subheading";

interface Props extends PropsWithChildren {
  variant: Variants;
}

const _Typography: React.FC<Props> = ({ variant, children }) => {
  const variantClasses = {
    label: "text-sm font-medium text-gray-700",
    link: "text-blue-500 underline",
    meta: "text-xs text-gray-500",
    error: "text-sm text-red-500",
    title: "text-2xl font-bold text-gray-900",
    highlight: "text-yellow-500 font-semibold",
    caption: "text-xs text-gray-400",
    body: "text-base text-gray-800",
    heading: "text-xl font-semibold text-gray-900",
    subheading: "text-lg font-medium text-gray-700",
  };
  const className = classnames(variantClasses[variant]);

  return <p className={className}>{children}</p>;
};

const Typography = _Typography;

export { Typography };
