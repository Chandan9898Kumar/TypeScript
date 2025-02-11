import { FC, useState } from "react";
import Header from "../../Components/Header/Header";
import SvgIcons from "../../assets/Svg";
import style from "./star.module.css";
const StartRating: FC = () => {
  const [hoverStars, setHoverStars] = useState<number >(0);
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const TOTAL_STARS: number = 5;

  const HandleMouseEnter = (hoveredStar: number): void => {
    setHoverStars(hoveredStar);
  };

  const handleMouseOut = (): void => {
    setHoverStars(0);
  };

  const handleSelectStars = (selectedStars: number): void => {
    setSelectedStars(selectedStars);
  };

  console.log(hoverStars, "hoverStars",selectedStars);
  return (
    <section>
      <Header title="Start Rating" className="customH1Tag" />

      <div className={style.container}>
        {Array(TOTAL_STARS)
          .fill("")
          .map((item, index) => {
            return (
              <RatedStars
                key={index}
                stars={index+1}
                hoverIn={HandleMouseEnter}
                hoverOut={handleMouseOut}
                selectedStars={handleSelectStars}
                // isMatched={}
              />
            );
          })}
      </div>
    </section>
  );
};

export default StartRating;

interface Stars {
  stars: number;
  hoverIn(hoveredStar: number): void;
  hoverOut(): void;
  selectedStars(selectedStars: number): void;
}

const RatedStars: FC<Stars> = ({ stars, hoverIn, hoverOut, selectedStars }) => {
  const FILLER: string = "navajowhite";

  return (
    <div
      className={style.stars}
      onMouseEnter={() => hoverIn(stars)}
      onMouseLeave={hoverOut}
      onClick={() => selectedStars(stars)}
    >
      {<SvgIcons.Star filler="cornflowerblue" />}
    </div>
  );
};
