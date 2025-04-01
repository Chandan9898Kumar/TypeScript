import NormalProgressBar from "./NormalProgress";
import ProgressOnComplete from './ProgressOnComplete';
import ProgressWithTimer from "./ProgressWithTimer";
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
