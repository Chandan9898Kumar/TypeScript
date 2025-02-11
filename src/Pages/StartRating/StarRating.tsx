import { FC, useState, useCallback, memo } from "react";
import Header from "../../Components/Header/Header";
import SvgIcons from "../../assets/Svg";
import style from "./star.module.css";
const StartRating: FC = () => {
  const [hoverStars, setHoverStars] = useState<number>(0);
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const TOTAL_STARS = 5;

  const handleMouseEnter = useCallback((hoveredStar: number): void => {
    setHoverStars(hoveredStar);
  }, []);

  const handleMouseOut = useCallback((): void => {
    setHoverStars(0);
  }, []);

  const handleSelectStars = useCallback((selected: number): void => {
    setSelectedStars(selected);
  }, []);

  const starsArray = Array.from(
    { length: TOTAL_STARS },
    (_, index) => index + 1
  );

  return (
    <section>
      <Header title="Start Rating" className="customH1Tag" />

      <div className={style.container} role="group" aria-label="Star rating">
        {starsArray.map((starNumber: number) => {
          return (
            <StarsRated
              key={starNumber}
              stars={starNumber}
              hoverIn={handleMouseEnter}
              hoverOut={handleMouseOut}
              selectedStars={handleSelectStars}
              isMatched={
                hoverStars
                  ? hoverStars >= starNumber
                  : selectedStars >= starNumber
              }
            />
          );
        })}
      </div>
    </section>
  );
};

export default StartRating;

interface StarProps {
  stars: number;
  hoverIn(hoveredStar: number): void;
  hoverOut(): void;
  selectedStars(selectedStars: number): void;
  isMatched: boolean;
}

const RatedStars: FC<StarProps> = ({
  stars,
  hoverIn,
  hoverOut,
  selectedStars,
  isMatched,
}) => {
  const FILLER_Hover = "navajowhite";
  const FILLER_NORMAL = "cornflowerblue";

  return (
    <div
      className={style.stars}
      onMouseEnter={() => hoverIn(stars)}
      onMouseLeave={hoverOut}
      onClick={() => selectedStars(stars)}
      role="button"
      aria-pressed={isMatched}
    >
      {
        <SvgIcons.Star
          filler={isMatched ? FILLER_Hover : FILLER_NORMAL}
          aria-hidden="true"
        />
      }
    </div>
  );
};

const StarsRated = memo(RatedStars);
