import { useState, useCallback, lazy, Suspense, memo } from "react";
import { PollOption, PollData } from "./mockPollData";
import styles from "./poll.module.css";
import PollResult from "./PollResult";

const ButtonWidget = lazy(() => import("./ButtonWidget"));

const pollDatas = [
  {
    id: 1,
    question: "What's your favorite programming language?",
    options: [
      { id: 1, text: "JavaScript", votes: 150 },
      { id: 2, text: "TypeScript", votes: 230 },
      { id: 3, text: "Python", votes: 120 },
      { id: 4, text: "Java", votes: 90 },
    ],
    totalVotes: 590,
    isActive: true,
  },
];

interface PollProps {
  id: number;
  option: PollOption;
  handlePolling: (id: number, event: string) => void;
  checkedItem: string;
}

interface WidgetProps {
  pollWidgetData?: PollData[];
}

const PollUi = ({ id, option, handlePolling, checkedItem }: PollProps) => {
  return (
    <div
      className={styles.poll}
      onClick={() => {
        handlePolling(id, option.text);
      }}
    >
      <label className={styles.labelTag}>
        <input
          type="radio"
          name="poll"
          value={option.text}
          checked={option.text === checkedItem}
          onChange={(event) => {
            handlePolling(id, event.target.value);
          }}
        />
        {option.text}
      </label>
    </div>
  );
};

const Poll = memo(PollUi);

const Widget = ({ pollWidgetData = [] }: WidgetProps) => {
  const [pollingData, setPollingData] = useState<PollData[]>(pollDatas);
  const [prevPoll, setPrevPoll] = useState<string>("");
  const [isPollingSelected, setIsPollingSelected] = useState<boolean>(false);
  const [isResultChecked, setIsResultChecked] = useState<boolean>(false);
  const [checkedItem, setCheckedItem] = useState<string>("");

  const handlePolling = useCallback(
    (selectedPollingId: number, selectedPollItem: string) => {
      setIsPollingSelected(true);
      setCheckedItem(selectedPollItem);

      const filterPoll = pollingData.filter(
        (item) => item.id === selectedPollingId
      );

      const updatedPoll = filterPoll.map((updateItem) => {
        const updateOption = updateItem.options.map((item) => {
          if (prevPoll && prevPoll === item.text) {
            item.votes = item.votes - 1;
          }
          return item.text === selectedPollItem
            ? { ...item, votes: item.votes + 1 }
            : item;
        });
        const totalVotes = updateOption.reduce(
          (acc, curr) => acc + curr.votes,
          0
        );

        return { ...updateItem, options: updateOption, totalVotes };
      });

      setPrevPoll(selectedPollItem);
      setPollingData(
        pollingData.map((updatePollingItem) => {
          return updatePollingItem.id === selectedPollingId
            ? updatedPoll[0]
            : updatePollingItem;
        })
      );
    },
    [pollingData, prevPoll]
  );

  const handleButtonClick = useCallback(() => {
    setIsResultChecked((prevResult) => !prevResult);
  }, []);

  return (
    <div>
      <h1 className={styles.h1Tag}>Poll Widget</h1>

      {isResultChecked ? (
        <PollResult
          pollingResults={pollingData[0].options}
          totalPollingVotes={pollingData[0].totalVotes}
        />
      ) : (
        <div className={styles.main}>
          {pollingData?.map((pollingItem) => {
            return (
              <div key={pollingItem.id} className={styles.container}>
                <h3 className={styles.h3Tag}>{pollingItem.question}</h3>
                {pollingItem?.options?.map((option) => {
                  return (
                    <Poll
                      key={`${pollingItem.id}-${option.id}`}
                      id={pollingItem.id}
                      option={option}
                      handlePolling={handlePolling}
                      checkedItem={checkedItem}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {isPollingSelected && (
        <Suspense fallback={<div>Loading...</div>}>
          <ButtonWidget
            onClick={handleButtonClick}
            label={isResultChecked ? "Go Back" : "See Result"}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Widget;
