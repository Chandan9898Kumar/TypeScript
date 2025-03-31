import NormalProgressBar from "./NormalProgress";
import ProgressWithTimer from "./ProgressWithTimer";
import ProgressOnComplete from './ProgressOnComplete'
const MainProgress = () => {
  return (
    <>
      <NormalProgressBar />
      <ProgressWithTimer />
      <ProgressOnComplete />
    </>
  );
};

export default MainProgress;
