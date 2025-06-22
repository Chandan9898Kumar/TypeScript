import { motion } from "framer-motion";
import { useState } from "react";
import "./App.css";

import Carousel from "./Pages/Carousel/Carousel";
import Header from "./Components/Header/Header";
import TrafficLight from "./Pages/TrafficLight/TrafficLight";
import PausableCounter from "./Pages/PausableCounter/PausableCounter";
import AccordionContainer from "./Pages/Accordion/Accordion";
import StartRating from "./Pages/StartRating/StarRating";
import Toggle from "./Components/Toggle/Toggle";
import MessageComponent from "./Pages/Message/Message";
import Stepper from "./Pages/Stepper/Stepper";
import AutoSuggestion from './Pages/AutoSuggestion/AutoSuggestion';
import InputFocusPartTwo from './Pages/OTP/OtpFieldTwo';
import ScrollOnElement from './Components/InfiniteScroll/ScrollerOnElement';
import InfiniteScroller from './Pages/InfiniteScroller/InfiniteScroller';
import FeatureFlagPage from './Pages/FeatureFlagPage/FeatureFlagPage';
import StopWatch from './Pages/StopWatch/StopWatch';
import TicTacToe from './Pages/TicTaeToe/TicTacToe';
import FindRingsAndRodCombination from './Pages/RingsAndRods/RingsRods';
import MainProgress from "./Pages/ProgressBarNTimes/MainProgress";
import FilterTable from './Pages/FilterTable/FilterTable';
import HigherOrderDashBoard from './Pages/HigherOrderComponent/MainOrder';
import GridLight from './Pages/GridLight/GridLight';
import SwapComponent from './Pages/SwapCheckedItem/SwapItemComponent';
import MultiSelectChip from './Pages/MultiSelectedInput/MultiSelectInput';
import TabBasedForm from './Pages/TabBasedForm/TabBasedForm';
import SpinBottle from './Pages/SpinBottle/SpinBottle';
import Multiplicand from './Pages/Multiplicand/Multiplicand';
import TodoApp from './Pages/ToDo/ToDo';
import Graph from './Pages/Graph/Graph';
import PollWidget from './Pages/PollWidget/Widget';
import CommentSection from './Pages/NestedCommentReply/CommentComponent';
import FileExplorer from './Pages/FileExplorer/FileExplorer';
import CrudFileExplorer from './Pages/CrudFileExplorer/CrudFileExplorer';
import OverlapingCircle from './Pages/OverlappingCircle/OverlappingcCircles';


const App: React.FC = () => {

  const [scrollData, setScrollData] = useState<number>(50);

  return (
    <div className='app'>
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
        <OverlapingCircle />
        <CommentSection />
        <FileExplorer />
        <CrudFileExplorer />
        <MultiSelectChip />
        <Graph />
        <SwapComponent />
        <GridLight />
        <HigherOrderDashBoard />
        <FilterTable />
        <MainProgress />
        <FindRingsAndRodCombination />
        <TicTacToe />
        <StopWatch />
        <FeatureFlagPage />
        <InputFocusPartTwo />
        <Carousel />
        <TrafficLight />
        <PausableCounter />
        <AccordionContainer />
        <StartRating />
        <MessageComponent />
        <Stepper />
        <AutoSuggestion />
        <ScrollOnElement scrollData={scrollData}  setScrollData={setScrollData}/>
        <InfiniteScroller />
        <Multiplicand />
        <SpinBottle />
        <TabBasedForm />
        <TodoApp />
        <PollWidget />
    </div>
  );
};

export default App;
