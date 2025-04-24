import styles from './tab.module.css'

interface TabsProps {
  tabs: string[];
  activeTab: number;
}

const Tabs = ({ tabs = [], activeTab = 0 }: TabsProps) => {
  return (
    <>
      <div className={styles.TabMain}>
        {tabs?.map((item, index) => {
          return (
            <div
              key={item}
              data-theme={activeTab === index ? "true" : "false"}
              className={styles.tabs}
            >
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Tabs;
