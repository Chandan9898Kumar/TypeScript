import { memo } from "react";
import styles from "./poll.module.css";
import { PollOption } from "./mockPollData";

interface PollResultProps {
  pollingResults: PollOption[];
  totalPollingVotes: number;
}

const PollResult = ({ pollingResults, totalPollingVotes }: PollResultProps) => {
  return (
    <div>
      <h1>The Polling Result</h1>
      {pollingResults.map((result) => {
        return (
          <div className={styles.resultMain} key={result.id}>
            <div className={styles.resultItems}>
              <div>Item : {result.text}</div>
              <div>Total Votes : {result.votes}</div>
              <div>
                Percentage :{" "}
                {`${Math.floor((result.votes / totalPollingVotes) * 100)} %`}
              </div>
            </div>
            <div>
              <progress
                value={Math.floor((result.votes / totalPollingVotes) * 100)}
                max="100"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(PollResult);
