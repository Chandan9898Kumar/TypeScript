import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import "./App.css";
import Loader from "./Components/Loader/Loader";
const Carousel = lazy(() => import("./Pages/Carousel/Carousel"));
const Header = lazy(() => import("./Components/Header/Header"));
const TrafficLight = lazy(() => import("./Pages/TrafficLight/TrafficLight"));
const PausableCounter = lazy(() => import("./Pages/PausableCounter/PausableCounter"));
const AccordionContainer = lazy(() => import("./Pages/Accordion/Accordion"));
const StartRating = lazy(() => import("./Pages/StartRating/StarRating"));
const Toggle = lazy(() => import("./Components/Toggle/Toggle"));
const App: React.FC = () => {
  console.log(process.env.NODE_ENV);
  return (
    <>
      <Suspense fallback={<Loader />}>
        <header>
          <motion.div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding:"10px 10px"
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          >
            <Header title="Machine Coding In TypeScript..." className="customTag" />
            <Toggle />
          </motion.div>
        </header>{" "}
        <Carousel />
        <TrafficLight />
        <PausableCounter />
        <AccordionContainer />
        <StartRating />
      </Suspense>
    </>
  );
};

export default App;
