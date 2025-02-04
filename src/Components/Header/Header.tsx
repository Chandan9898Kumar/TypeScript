import { FC } from "react";

interface HeaderProp {
  title: string;
  className?: string;
}

const Header: FC<HeaderProp> = ({ title = "Heading", className }) => {
  return <h1 className={className ?? ""}>{title}</h1>;
};

export default Header;
