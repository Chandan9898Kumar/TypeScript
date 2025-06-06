import { memo, useMemo } from "react";
import styles from "./poll.module.css";
import { PollOption } from "./mockPollData";

interface PollResultProps {
  pollingResults: PollOption[];
  totalPollingVotes: number;
}

const PollResult = ({ pollingResults, totalPollingVotes }: PollResultProps) => {
  const resultsWithPercentage = useMemo(
    () =>
      pollingResults.map((result) => ({
        ...result,
        percentage:
          totalPollingVotes > 0
            ? Math.round((result.votes / totalPollingVotes) * 100)
            : 0,
      })),
    [pollingResults, totalPollingVotes]
  );

  return (
    <div className={styles.main}>
      <h1>The Polling Result</h1>
      {resultsWithPercentage?.map(({ id, text, votes, percentage }) => (
        <div className={styles.resultMain} key={id}>
          <div className={styles.resultItems}>
            <div>Item : {text}</div>
            <div>Total Votes : {votes}</div>
            <div>Percentage : {percentage} %</div>
          </div>
          <div>
            <progress value={percentage} max="100" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(PollResult);
