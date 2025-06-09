import { useState } from "react";
import Comment from "./Comment";
const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Jane Doe",
      date: "2023-05-15",
      text: "This is a great article!",
      parentId: null,
      replies: [
        {
          id: 2,
          author: "John Smith",
          date: "2023-05-15",
          text: "I agree with you completely.",
          replies: [
            {
              id: 3,
              author: "Jane Doe",
              date: "2023-05-16",
              text: "Thanks for your support!",
              replies: [],
            },
          ],
        },
        {
          id: 4,
          author: "Alice Johnson",
          date: "2023-05-16",
          text: "I have a different perspective...",
          replies: [
            {
              id: 5,
              author: "Jane Doe",
              date: "2023-05-16",
              text: "Thanks for your support and help 5!",
              replies: [],
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <div>Comment</div>
    </>
  );
};

export default CommentSection;
