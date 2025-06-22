import { CircleOverlapSchema } from "./Schema";

// helper function to generate a random color
export const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Helper function to detect if two circles overlap
export const circlesOverlap = (
  circle1: CircleOverlapSchema,
  circle2: CircleOverlapSchema
): boolean => {
  const distance = Math.sqrt(
    Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2)
  );

  // Compare distance with sum of radii
  return distance < circle1.size / 2 + circle2.size / 2;
};
