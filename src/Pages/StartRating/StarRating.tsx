import { FC, useState, useCallback, memo } from "react";
import Header from "../../Components/Header/Header";
import SvgIcons from "../../assets/Svg";
import style from "./star.module.css";
import { motion } from "framer-motion";
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
    <motion.div
      className={style.stars}
      onMouseEnter={() => hoverIn(stars)}
      onMouseLeave={hoverOut}
      onClick={() => selectedStars(stars)}
      role="button"
      aria-pressed={isMatched}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: isMatched ? [0, 15, -15, 0] : 0,
      }}
      transition={{
        duration: 0.2,
        rotate: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
    >
      <motion.div
        animate={{
          scale: isMatched ? 1.1 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <SvgIcons.Star
          filler={isMatched ? FILLER_Hover : FILLER_NORMAL}
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  );
};

const StarsRated = memo(RatedStars);
