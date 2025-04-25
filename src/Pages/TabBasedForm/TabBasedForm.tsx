import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PageData } from "./Config";
import Interest from "./InterestTab";
import Public from "./PublicTab";
import Settings from "./SettingsTab";
import TabButton from "./TabButton";
import Tabs from "./Tabs";
import styles from "./tab.module.css";

type Tab = "Public" | "Interest" | "Setting";

interface BaseData {
  id: number;
  name: string;
  type: string;
}

interface PublicData extends BaseData {
  placeholder: string;
  value: string;
}

interface InterestSettingData extends BaseData {
  checked: boolean;
}

// Define separate props for each component type
type ComponentProps =
  | {
      // type: "public";
      data: PublicData[];
      changeFunction: (
        id: number,
        event: ChangeEvent<HTMLInputElement>
      ) => void;
    }
  | {
      type: "interest" | "setting";
      data: InterestSettingData[];
      changeFunction: (
        id: number,
        event: ChangeEvent<HTMLInputElement>
      ) => void;
    };

type TabComponent = React.ComponentType<ComponentProps>;

const Pages: TabComponent[] = [
  Public as TabComponent,
  Interest as TabComponent,
  Settings as TabComponent,
];
const TABS: Tab[] = ["Public", "Interest", "Setting"];

interface Button {
  [index: string]: () => void;
  Next: () => void;
  Prev: () => void;
  Submit: () => void;
}

type FormData = PublicData | InterestSettingData;

interface TabsData {
  [index: string]: {
    data: FormData[];
    setData: (id: number, event: ChangeEvent<HTMLInputElement>) => void;
  };
}

export default function TabBasedForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [publicData, setPublic] = useState<PublicData[]>(PageData.Public);
  const [interestData, setInterestData] = useState<InterestSettingData[]>(PageData.Interest);
  const [settingData, setSettingData] = useState<InterestSettingData[]>(PageData.Settings);
  const [userInformation, setUserInformation] = useState<FormData[][]>([]);

  const TabsData: TabsData = {
    Public: {
      data: publicData,
      setData: (id: number, event: ChangeEvent<HTMLInputElement>) => {
        setPublic((prevData) => {
          return prevData.map((item) => {
            return item.id === id
              ? { ...item, value: event.target.value }
              : item;
          });
        });
      },
    },
    Interest: {
      data: interestData,
      setData: (id: number, event: ChangeEvent<HTMLInputElement>) => {
        setInterestData((prevData) => {
          return prevData.map((item) => {
            return item.id === id
              ? { ...item, checked: event.target.checked }
              : item;
          });
        });
      },
    },
    Setting: {
      data: settingData,
      setData: (id: number, event: ChangeEvent<HTMLInputElement>) => {
        setSettingData((prevData) => {
          return prevData.map((item) => {
            return item.id === id
              ? { ...item, checked: event.target.checked }
              : item;
          });
        });
      },
    },
  };

  const BUTTONS: Button = useMemo(
    () => ({
      Next: () => setActiveTab((prev) => prev + 1),
      Prev: () => setActiveTab((prev) => prev - 1),
      Submit: () => {
        const PublicData = publicData.filter((item) => item.value);
        const InterestData = interestData.filter((item) => item.checked);
        const SettingData = settingData.filter((item) => item.checked);
        setActiveTab(0);
        setUserInformation([PublicData, InterestData, SettingData]);
        setPublic(PageData.Public);
        setInterestData(PageData.Interest);
        setSettingData(PageData.Settings);
      },
    }),
    [interestData, publicData, settingData]
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const button = BUTTONS[(event.target as HTMLButtonElement).value];
      if (button) {
        button();
      }
    },
    [BUTTONS]
  );

  const SubmittedData = !!userInformation.length && (
    <div className={styles["submitted-data"]}>
      {userInformation.flat().map((data) => (
        <div key={data.id}>
          {data.name} : {"  "}
          {"value" in data ? data.value : data.checked.toString()}
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (userInformation.length) {
      timer = setTimeout(() => {
        setUserInformation([]);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [userInformation]);

  const renderActiveComponent = () => {
    const Component = Pages[activeTab];
    const currentTab = TABS[activeTab];

    return (
      <Component
        data={TabsData[currentTab].data as PublicData[] & InterestSettingData[]}
        changeFunction={TabsData[currentTab].setData}
      />
    );
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Tab Based Form</h1>
      <div className={styles.tabsContainer}>
        <Tabs tabs={TABS} activeTab={activeTab} />
      </div>
      <div className={styles.componentContainer}>{renderActiveComponent()}</div>
      <div className={styles.buttonContainer}>
        <TabButton
          activeTab={activeTab}
          totalTabLength={TABS.length}
          onClick={handleClick}
        />
      </div>
      <div>{SubmittedData}</div>
    </div>
  );
}
