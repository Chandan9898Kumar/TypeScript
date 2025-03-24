import styles from "./stepper.module.css";
export const Component1 = () => {
  return (
    <div className="wrapper">
      <div className="clash-card barbarian">
        <div className="clash-card__image clash-card__image--barbarian">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/barbarian.png"
            alt="barbarian"
            loading="lazy"
          />
        </div>
        <div className={styles.centerItem}>
          <div className="clash-card__level clash-card__level--barbarian">
            Level 1
          </div>
          <div className="clash-card__unit-name">The Barbarian</div>
        </div>
      </div>
    </div>
  );
};

export const Component2 = () => {
  return (
    <div className="wrapper">
      <div className="clash-card archer">
        <div className="clash-card__image clash-card__image--archer">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/archer.png"
            alt="archer"
            loading="lazy"
          />
        </div>
        <div className={styles.centerItem}>
          {" "}
          <div className="clash-card__level clash-card__level--archer">
            Level 2
          </div>
          <div className="clash-card__unit-name">The Archer</div>
        </div>
      </div>
    </div>
  );
};

export const Component3 = () => {
  return (
    <div className="wrapper">
      <div className="clash-card giant">
        <div className="clash-card__image clash-card__image--giant">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/giant.png"
            alt="giant"
            loading="lazy"
          />
        </div>
        <div className={styles.centerItem}>
          <div className="clash-card__level clash-card__level--giant">
            Level 3
          </div>
          <div className="clash-card__unit-name">The Giant</div>
        </div>
      </div>
      {/* end clash-card giant*/}
    </div>
  );
};

export const Component4 = () => {
  return (
    <div className="wrapper">
      <div className="clash-card goblin">
        <div className="clash-card__image clash-card__image--goblin">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/goblin.png"
            alt="goblin"
            loading="lazy"
          />
        </div>
        <div className={styles.centerItem}>
          <div className="clash-card__level clash-card__level--goblin">
            Level 4
          </div>
          <div className="clash-card__unit-name">The Goblin</div>
        </div>
      </div>
      {/* end clash-card goblin*/}
    </div>
  );
};

export const Component5 = () => {
  return (
    <div className="wrapper">
      <div className="clash-card wizard">
        <div className="clash-card__image clash-card__image--wizard">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/wizard.png"
            alt="wizard"
            loading="lazy"
          />
        </div>
        <div className={styles.centerItem}>
          <div className="clash-card__level clash-card__level--wizard">
            Level 5
          </div>
          <div className="clash-card__unit-name">The Wizard</div>
        </div>
      </div>
      {/* end clash-card wizard*/}
    </div>
  );
};
