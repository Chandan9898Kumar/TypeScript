import { useState, useCallback, lazy, Suspense,memo } from "react";
import { PollOption, PollData } from "./mockPollData";
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
}

interface WidgetProps {
  pollWidgetData?: PollData[];
}

const PollUi = ({ id, option, handlePolling }: PollProps) => {

  return (
    <>
      <label>
        <input
          type="radio"
          name="poll"
          value={option.text}
          onChange={(event) => {
            handlePolling(id, event.target.value);
          }}
        />
        {option.text}
      </label>
    </>
  );
};

const Poll= memo(PollUi)

const Widget = ({ pollWidgetData=[] }: WidgetProps) => {
  const [pollingData, setPollingData] = useState<PollData[]>(pollDatas);
  const [prevPoll, setPrevPoll] = useState<string>("");
  const [isPollingSelected, setIsPollingSelected] = useState<boolean>(false);
  const [isResultChecked, setIsResultChecked] = useState<boolean>(false);

  const handlePolling = useCallback((selectedPollingId: number, selectedPollItem: string) => {
      setIsPollingSelected(true);

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
      <h1>Poll Widget</h1>

      <div className="main">
        {pollingData?.map((pollingItem) => {
          return (
            <div key={pollingItem.id} className="container">
              <span>{pollingItem.question}</span>
              {pollingItem?.options?.map((option) => {
                return (
                  <Poll
                    key={`${pollingItem.id}-${option.id}`}
                    id={pollingItem.id}
                    option={option}
                    handlePolling={handlePolling}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

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
