import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from "react";
import { PageData } from "./Config";
import Interest from "./InterestTab";
import Public from "./PublicTab";
import Settings from "./SettingsTab";
import TabButton from "./TabButton";
import Tabs from "./Tabs";
import styles from "./tab.module.css";
type Tab = "Public" | "Interest" | "Setting";

const Pages = [Public, Interest, Settings];

const TABS: Tab[] = ["Public", "Interest", "Setting"];

interface Button {
  [index: string]: () => void;
  Next: () => void;
  Prev: () => void;
  Submit: () => void;
}

interface PublicData {
  id: number;
  name: string;
  placeholder: string;
  value: string;
  type: string;
}

interface InterestSettingData {
  id: number;
  name: string;
  checked: boolean;
  type: string;
}
interface TabsData {
  [index: string]: {
    data: PublicData[] | InterestSettingData[];
    setData: (id: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export default function TabBasedForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [publicData, setPublic] = useState<PublicData[]>(PageData.Public);
  const [interestData, setInterestData] = useState<InterestSettingData[]>(PageData.Interest);
  const [settingData, setSettingData] = useState<InterestSettingData[]>(PageData.Settings);
  const [userInformation, setUserInformation] = useState({});

  const Component = Pages[activeTab];

  const TabsData: TabsData = {
    Public: {
      data: publicData,
      setData: (id:number, event:ChangeEvent<HTMLInputElement>) => {
        setPublic((prevData)=>{
          return prevData?.map((item)=>{
            return item.id === id ? {...item, value: event.target.value} : item
          })
        })
      },
    },
    Interest: {
      data: interestData,
      setData: (id:number, event:ChangeEvent<HTMLInputElement>) => {
        console.log("Interest", id, event.target.value);
      },
    },
    Setting: {
      data: settingData,
      setData: (id:number, event:ChangeEvent<HTMLInputElement>) => {
        console.log("setting Data", id, event.target.value);
      },
    },
  };

  //  Button Component
  const BUTTONS: Button = useMemo(() => ({
      Next: () => setActiveTab((prev) => prev + 1),
      Prev: () => setActiveTab((prev) => prev - 1),
      Submit: () => {
        setActiveTab(0);
        setUserInformation({ publicData, interestData, settingData });
        setPublic(PageData.Public);
        setInterestData(PageData.Interest);
        setSettingData(PageData.Settings);
      },
    }),
    [interestData, publicData, settingData]
  );

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
      const button = BUTTONS[(event.target as HTMLButtonElement).value];
      if (button) {
        button();
      }
    },
    [BUTTONS]
  );


  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Tab Based Form</h1>
      <div className={styles.tabsContainer}>
        <Tabs tabs={TABS} activeTab={activeTab} />
      </div>
      <div className={styles.componentContainer}>
        <Component
          data={TabsData[TABS[activeTab]].data}
          changeFunction={TabsData[TABS[activeTab]].setData}
        />
      </div>
      <div className={styles.buttonContainer}>
        <TabButton
          activeTab={activeTab}
          totalTabLength={TABS.length}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
