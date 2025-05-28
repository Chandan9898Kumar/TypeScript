export interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export interface PollData {
  id: number;
  question: string;
  options: PollOption[];
  totalVotes: number;
  isActive: boolean;
}

export const mockPolls: PollData[] = [
  {
    id: 1,
    question: "What's your favorite programming language?",
    options: [
      { id: 1, text: "JavaScript", votes: 150 },
      { id: 2, text: "TypeScript", votes: 230 },
      { id: 3, text: "Python", votes: 120 },
      { id: 4, text: "Java", votes: 90 },
    ],
    totalVotes: 590,
    isActive: true,
  },
  {
    id: 2,
    question: "Which frontend framework do you prefer?",
    options: [
      { id: 1, text: "React", votes: 320 },
      { id: 2, text: "Vue", votes: 110 },
      { id: 3, text: "Angular", votes: 95 },
      { id: 4, text: "Svelte", votes: 75 },
    ],
    totalVotes: 600,
    isActive: true,
  },
  {
    id: 3,
    question: "How often do you refactor your code?",
    options: [
      { id: 1, text: "Daily", votes: 85 },
      { id: 2, text: "Weekly", votes: 210 },
      { id: 3, text: "Monthly", votes: 140 },
      { id: 4, text: "Rarely", votes: 65 },
    ],
    totalVotes: 500,
    isActive: false,
  },
];
