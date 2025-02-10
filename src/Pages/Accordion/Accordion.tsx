import React, { FC, useState } from "react";
import SvgIcons from "../../assets/Svg";
import Header from "../../Components/Header/Header";
import style from "./accord.module.css";
interface accordionData {
  id: number;
  title: string;
  description: string;
  isOpen: boolean;
}

const AccordionData: accordionData[] = [
  {
    id: 1,
    title: "The 400 Blows",
    description:
      "A young boy, left without attention, delves into a life of petty crime.",
    isOpen: false,
  },
  {
    id: 2,
    title: "La haine",
    description:
      "24 hours in the lives of three young men in the French suburbs the day after a violent riot.",
    isOpen: false,
  },
  {
    id: 3,
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    isOpen: false,
  },
  {
    id: 4,
    title: "The Godfather Part II",
    description:
      "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
    isOpen: false,
  },
  {
    id: 5,
    title: " Man Bites Dog",
    description:
      "A film crew follows a ruthless thief and heartless killer as he goes about his daily routine. But complications set in when the film crew lose their objectivity and begin lending a hand.",
    isOpen: false,
  },
  {
    id: 6,
    title: "The Departed",
    description:
      "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    isOpen: false,
  },
];

const AccordionContainer: FC = () => {
  return (
    <section>
      <Header title="Accordion" className="customH1Tag" />
      <Accordion data={AccordionData} />
    </section>
  );
};

export default AccordionContainer;

interface AccordProps {
  data: accordionData[];
}

const Accordion: FC<AccordProps> = ({ data }) => {
  const [result, setResult] = useState(data);

  const handleClick = (
    event: React.MouseEvent<HTMLUListElement, MouseEvent>
  ): void => {
    const target = event.target as HTMLElement;
    const itemData = JSON.parse(target.dataset.items || "{}") as accordionData;

    document.startViewTransition(() => {
      setResult(
        result.map((item) => {
          return {
            ...item,
            isOpen: item.id === itemData.id ? !item.isOpen : false,
          };
        })
      );
    });
  };

  return (
    <ul className={style.container} onClick={handleClick} role="button" aria-label="Movie descriptions accordion">
      {result?.map((item) => {
        return (
          <li
            key={item.id}
            className={style.lists}
            data-items={JSON.stringify(item)}
            role="listitem"
          >
            {item.isOpen ? <SvgIcons.DownArrow /> : <SvgIcons.RightArrow />}{" "}
            {item.title}
            {item.isOpen && (
              <div role="region" className={style.description}>{item.description}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
