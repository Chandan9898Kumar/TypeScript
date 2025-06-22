import { motion } from "framer-motion";
import { lazy, Suspense, useState } from "react";
import "./App.css";
import Loader from "./Components/Loader/Loader";

const Carousel = lazy(() => import("./Pages/Carousel/Carousel"));
const Header = lazy(() => import("./Components/Header/Header"));
const TrafficLight = lazy(() => import("./Pages/TrafficLight/TrafficLight"));
const PausableCounter = lazy(() => import("./Pages/PausableCounter/PausableCounter"));
const AccordionContainer = lazy(() => import("./Pages/Accordion/Accordion"));
const StartRating = lazy(() => import("./Pages/StartRating/StarRating"));
const Toggle = lazy(() => import("./Components/Toggle/Toggle"));
const MessageComponent = lazy(() => import("./Pages/Message/Message"));
const Stepper = lazy(() => import("./Pages/Stepper/Stepper"));
const AutoSuggestion = lazy(()=>import('./Pages/AutoSuggestion/AutoSuggestion'))
const InputFocusPartTwo = lazy(()=>import('./Pages/OTP/OtpFieldTwo'))
const ScrollOnElement = lazy(()=>import('./Components/InfiniteScroll/ScrollerOnElement'))
const InfiniteScroller = lazy(()=>import('./Pages/InfiniteScroller/InfiniteScroller'))
const FeatureFlagPage = lazy(()=>import('./Pages/FeatureFlagPage/FeatureFlagPage'))
const StopWatch = lazy(()=>import('./Pages/StopWatch/StopWatch'))
const TicTacToe = lazy(()=>import('./Pages/TicTaeToe/TicTacToe'))
const FindRingsAndRodCombination = lazy(()=>import('./Pages/RingsAndRods/RingsRods'))
const MainProgress = lazy(() => import("./Pages/ProgressBarNTimes/MainProgress"));
const FilterTable = lazy(()=>import('./Pages/FilterTable/FilterTable'))
const HigherOrderDashBoard = lazy(()=>import('./Pages/HigherOrderComponent/MainOrder'))
const GridLight  = lazy(()=>import('./Pages/GridLight/GridLight'))
const SwapComponent = lazy(()=>import('./Pages/SwapCheckedItem/SwapItemComponent'))
const MultiSelectChip = lazy(()=>import('./Pages/MultiSelectedInput/MultiSelectInput'))
const TabBasedForm = lazy(()=>import('./Pages/TabBasedForm/TabBasedForm'))
const SpinBottle = lazy(()=>import('./Pages/SpinBottle/SpinBottle'))
const Multiplicand = lazy(()=> import('./Pages/Multiplicand/Multiplicand'))
const TodoApp = lazy(()=>import('./Pages/ToDo/ToDo'))
const Graph = lazy(()=>import('./Pages/Graph/Graph'))
const PollWidget = lazy(()=>import('./Pages/PollWidget/Widget'))
const CommentSection = lazy(()=>import('./Pages/NestedCommentReply/CommentComponent'))
const FileExplorer = lazy(()=>import('./Pages/FileExplorer/FileExplorer'))
const CrudFileExplorer  = lazy(()=>import('./Pages/CrudFileExplorer/CrudFileExplorer'))
const OverlapingCircle = lazy(()=>import('./Pages/overlappingcircles/overlappingcCircles'))


const App: React.FC = () => {

  const [scrollData, setScrollData] = useState<number>(50);

  return (
    <div className='app'>
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
        
      </Suspense>
    </div>
  );
};

export default App;
