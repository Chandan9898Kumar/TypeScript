import { MouseEvent, useCallback, useMemo, useState } from "react";
import { PageData } from "./Config";
import Interest from "./InterestTab";
import Public from "./PublicTab";
import Settings from "./SettingsTab";
import TabButton from "./TabButton";
import Tabs from "./Tabs";

type Tab = "Public" | "Interest" | "Setting";

const Pages = [Public, Interest, Settings];

const TABS: Tab[] = ["Public", "Interest", "Setting"];

interface Button {
  [index: string]: () => void;
  Next: () => void;
  Prev: () => void;
  Submit: () => void;
}

export default function TabBasedForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [publicData, setPublic] = useState(PageData.Public);
  const [interestData, setInterestData] = useState(PageData.Interest);
  const [settingData, setSettingData] = useState(PageData.Settings);

  const Component = Pages[activeTab];

  //  Button Component
  const BUTTONS: Button = useMemo(
    () => ({
      Next: () => setActiveTab((prev) => prev + 1),
      Prev: () => setActiveTab((prev) => prev - 1),
      Submit: () => setActiveTab(0),
    }),
    []
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const button = BUTTONS[(event.target as HTMLInputElement).value];
      if (button) {
        button();
      }
    },
    [BUTTONS]
  );

  console.log("Public Data", publicData);
  console.log("Interest Data", interestData);
  console.log("Setting Data", settingData);

  return (
    <div>
      <h1>Tab Based Form</h1>
      <Tabs tabs={TABS} activeTab={activeTab} />
      <Component />
      <TabButton
        activeTab={activeTab}
        totalTabLength={TABS.length}
        onClick={handleClick}
      />
    </div>
  );
}
