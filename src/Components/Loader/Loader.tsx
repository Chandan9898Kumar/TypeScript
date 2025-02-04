import { FC } from "react";

import loaderStyle from "./loader.module.css";
const Loader: FC = () => {
  return (
    <div className={loaderStyle.container}>
      <div className={loaderStyle.loader}></div>
    </div>
  );
};

export default Loader;
