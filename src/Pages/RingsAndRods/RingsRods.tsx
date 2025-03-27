import { useState, useEffect, ChangeEvent, useCallback } from "react";
import styles from "./rings.module.css";
function countRodsWithAllColors(rings: string) {
  // Create an array to track colors for each of the 10 rods
  const rods = Array.from({ length: 10 }, () => new Set());

  // Iterate through the rings string in pairs
  for (let i = 0; i < rings.length; i += 2) {
    const color = rings[i]; // Color of the ring
    const rod = parseInt(rings[i + 1]); // Rod number

    // Add the color to the corresponding rod's set
    rods[rod]?.add(color);
  }

  // Prepare to collect the rods that have all three colors
  const rodsWithAllColors = [];

  // Check each rod for all three colors
  for (let i = 0; i < rods.length; i++) {
    if (rods[i].size === 3) {
      // If the set has all three colors
      rodsWithAllColors.push(`Rod ${i}`); // Store the rod number in the desired format
    }
  }

  return rodsWithAllColors.length ? rodsWithAllColors : ["No rods have all three colors"];
}

const FindRingsAndRodCombination = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = useCallback(() => {
    setData(countRodsWithAllColors(inputValue));
    setCurrentSlide(0);
  }, [inputValue]);

  useEffect(() => {
    if (!data.length) return;

    const timer = setTimeout(
      () => {
        if (currentSlide < data.length - 1) {
          setCurrentSlide((prev) => prev + 1);
        } else {
          setData([]);
          setCurrentSlide(0);
        }
      },
      currentSlide < data.length - 1 ? 2000 : 1000
    );

    return () => clearTimeout(timer);
  }, [currentSlide, data]);

  return (
    <div>
      <h1>Rings and Rods!</h1>

      <div className={styles.container}>
        <input placeholder="B0B6G0R6R0R6G9" type="text" value={inputValue} onChange={handleChange} />
        <button
          type="button"
          disabled={Boolean(data.length)}
          onClick={handleClick}
        >
          Submit
        </button>
      </div>

      <div className={styles.status}>{!!data.length && data[currentSlide]}</div>
    </div>
  );
};

export default FindRingsAndRodCombination;

/*
Return the number of rods that have all three colors of rings on them." 

"rings = ""B0B6G0R6R0R6G9""  Output: 1 
Rod 0

You are given a string rings representing rings placed on rods.

Each pair of characters in rings represents a ring's color and the rod it is placed on.
For example, "B0" means a blue ring on rod 0.
There are only 3 colors:
'R' = Red
'G' = Green
'B' = Blue

There are 10 rods, numbered 0 through 9.


Input: "R0G0B0R1G1B1R2G2B2"
- Rod 0: B, G, R (✅)
- Rod 1: B, G, R (✅)
- Rod 2: B, G, R (✅)

Output: 3


Input: "B0B0G0G0R0R0"

- Rod 0 has: B, G, R (✅)

Output: 1


Input: "B0G0B1R1G2R2B3R3"
Explanation:
- Rod 0: B, G (❌ missing R)
- Rod 1: B, R (❌ missing G)
- Rod 2: G, R (❌ missing B)
- Rod 3: B, R (❌ missing G)

Output: 0

R0G0B0R0G0B0R0G0B0R1G11R1G1B1R1G1B1
output : 2 --> rod 0 and rod 1


*/
