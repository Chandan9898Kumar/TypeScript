import { motion } from "framer-motion";
import { useState, useEffect, useRef, Suspense, lazy, ReactNode } from "react";
import "./App.css";
import Loader from "./Components/Loader/Loader";

// Direct imports for above-the-fold content
import Header from "./Components/Header/Header";
import Toggle from "./Components/Toggle/Toggle";
import OverlapingCircle from './Pages/OverlappingCircle/OverlappingcCircles';
import CommentSection from './Pages/NestedCommentReply/CommentComponent';
import FileExplorer from './Pages/FileExplorer/FileExplorer';

// Lazy imports for below-the-fold content
const CrudFileExplorer = lazy(() => import('./Pages/CrudFileExplorer/CrudFileExplorer'));
const MultiSelectChip = lazy(() => import('./Pages/MultiSelectedInput/MultiSelectInput'));
const Graph = lazy(() => import('./Pages/Graph/Graph'));
const SwapComponent = lazy(() => import('./Pages/SwapCheckedItem/SwapItemComponent'));
const GridLight = lazy(() => import('./Pages/GridLight/GridLight'));
const HigherOrderDashBoard = lazy(() => import('./Pages/HigherOrderComponent/MainOrder'));
const FilterTable = lazy(() => import('./Pages/FilterTable/FilterTable'));
const MainProgress = lazy(() => import("./Pages/ProgressBarNTimes/MainProgress"));
const FindRingsAndRodCombination = lazy(() => import('./Pages/RingsAndRods/RingsRods'));
const TicTacToe = lazy(() => import('./Pages/TicTaeToe/TicTacToe'));
const StopWatch = lazy(() => import('./Pages/StopWatch/StopWatch'));
const FeatureFlagPage = lazy(() => import('./Pages/FeatureFlagPage/FeatureFlagPage'));
const InputFocusPartTwo = lazy(() => import('./Pages/OTP/OtpFieldTwo'));
const Carousel = lazy(() => import("./Pages/Carousel/Carousel"));
const TrafficLight = lazy(() => import("./Pages/TrafficLight/TrafficLight"));
const PausableCounter = lazy(() => import("./Pages/PausableCounter/PausableCounter"));
const AccordionContainer = lazy(() => import("./Pages/Accordion/Accordion"));
const StartRating = lazy(() => import("./Pages/StartRating/StarRating"));
const MessageComponent = lazy(() => import("./Pages/Message/Message"));
const Stepper = lazy(() => import("./Pages/Stepper/Stepper"));
const AutoSuggestion = lazy(() => import('./Pages/AutoSuggestion/AutoSuggestion'));
const ScrollOnElement = lazy(() => import('./Components/InfiniteScroll/ScrollerOnElement'));
const InfiniteScroller = lazy(() => import('./Pages/InfiniteScroller/InfiniteScroller'));
const Multiplicand = lazy(() => import('./Pages/Multiplicand/Multiplicand'));
const SpinBottle = lazy(() => import('./Pages/SpinBottle/SpinBottle'));
const TabBasedForm = lazy(() => import('./Pages/TabBasedForm/TabBasedForm'));
const TodoApp = lazy(() => import('./Pages/ToDo/ToDo'));
const PollWidget = lazy(() => import('./Pages/PollWidget/Widget'));
const ModalImageGallery = lazy(()=> import('./Pages/ModalImageGallery/ModalImageGallery'))
const NestedCheckBox = lazy(()=>import("./Pages/NestedCheckBox/NestedCheckBox"))
const MainNavigationPage = lazy(() => import('./Pages/CountDownWithNavigation/MainNavigationPage'));


// Intersection Observer Hook
const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add 2 second delay to see placeholder clearly
          setTimeout(() => setIsVisible(true), 1000)
          observer.disconnect();
        }
      },
      { rootMargin: '0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Lazy Wrapper Component
interface LazyWrapperProps {
  children: ReactNode;
  height?: string;
}

const LazyWrapper: React.FC<LazyWrapperProps> = ({ children, height = "300px" }) => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div ref={ref} style={{ minHeight: height }}>
      {isVisible ? (
        <Suspense fallback={<Loader />}>
          {children}
        </Suspense>
      ) : (
        <div style={{ 
          height, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          border: '1px dashed #ccc',
          borderRadius: '8px'
        }}>
          Component will load when visible...
        </div>
      )}
    </div>
  );
};


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
        {/* Load immediately - visible on page load */}
        <OverlapingCircle />
        <CommentSection />
        <FileExplorer />
        
        {/* Lazy load when scrolled into view */}
        <LazyWrapper><NestedCheckBox /></LazyWrapper>
        <LazyWrapper><CrudFileExplorer /></LazyWrapper>
        <LazyWrapper><MultiSelectChip /></LazyWrapper>
        <LazyWrapper><Graph /></LazyWrapper>
        <LazyWrapper><SwapComponent /></LazyWrapper>
        <LazyWrapper><GridLight /></LazyWrapper>
        <LazyWrapper><HigherOrderDashBoard /></LazyWrapper>
        <LazyWrapper><FilterTable /></LazyWrapper>
        <LazyWrapper><MainProgress /></LazyWrapper>
        <LazyWrapper><FindRingsAndRodCombination /></LazyWrapper>
        <LazyWrapper><TicTacToe /></LazyWrapper>
        <LazyWrapper><StopWatch /></LazyWrapper>
        <LazyWrapper><FeatureFlagPage /></LazyWrapper>
        <LazyWrapper><InputFocusPartTwo /></LazyWrapper>
        <LazyWrapper><Carousel /></LazyWrapper>
        <LazyWrapper><TrafficLight /></LazyWrapper>
        <LazyWrapper><PausableCounter /></LazyWrapper>
        <LazyWrapper><AccordionContainer /></LazyWrapper>
        <LazyWrapper><StartRating /></LazyWrapper>
        <LazyWrapper><MessageComponent /></LazyWrapper>
        <LazyWrapper><Stepper /></LazyWrapper>
        <LazyWrapper><AutoSuggestion /></LazyWrapper>
        <LazyWrapper><ScrollOnElement scrollData={scrollData} setScrollData={setScrollData}/></LazyWrapper>
        <LazyWrapper><InfiniteScroller /></LazyWrapper>
        <LazyWrapper><Multiplicand /></LazyWrapper>
        <LazyWrapper><SpinBottle /></LazyWrapper>
        <LazyWrapper><TabBasedForm /></LazyWrapper>
        <LazyWrapper><TodoApp /></LazyWrapper>
        <LazyWrapper><PollWidget /></LazyWrapper>
        <LazyWrapper><ModalImageGallery /></LazyWrapper>
        <LazyWrapper><MainNavigationPage /></LazyWrapper>
    </div>
  );
};

export default App;
