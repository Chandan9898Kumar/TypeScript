import { lazy, Suspense } from "react";
import "./App.css";
import Loader from "./Components/Loader/Loader";
const Carousel = lazy(() => import("./Pages/Carousel/Carousel"));
const Header = lazy(() => import("./Components/Header/Header"));
const TrafficLight = lazy(()=>import('./Pages/TrafficLight/TrafficLight'))
const PausableCounter = lazy(()=>import('./Pages/PausableCounter/PausableCounter'))
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
        <TrafficLight />
        <PausableCounter />
      </Suspense>
    </>
  );
};

export default App;
