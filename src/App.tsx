import { lazy, Suspense } from "react";
import "./App.css";
import Loader from "./Components/Loader/Loader";
const Carousel = lazy(() => import("./Pages/Carousel/Carousel"));
const Header = lazy(() => import("./Components/Header/Header"));
const App: React.FC = () => {
  console.log(process.env.NODE_ENV);
  return (
    <>
      <Suspense fallback={<Loader />}>
      <header>
      <Header title="Machine Coding In TypeScript..."/>
      </header>
        {" "}
        <Carousel />
      </Suspense>
    </>
  );
};

export default App;
