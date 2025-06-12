import { ChangeEvent, useState } from "react";
import { getDate, getUniqueId } from "./Utils";

const AddComment = ({
  setCommentList,
  label = "ADD COMMENT",
  placeholder = "Enter your comment here",
}) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (event:ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleAddComment = () => {
    if (commentText.trim() === "") {
      return;
    }
    const elements = {
      id: getUniqueId(),
      author: "John Smith",
      date: getDate(),
      text: commentText,
      replies: [],
    };
    setCommentList(elements);
    setCommentText("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleCommentChange}
        value={commentText}
      />
      {"  "}
      <button
        disabled={!commentText.trim().length}
        type="button"
        onClick={handleAddComment}
        className=""
      >
        {label}
      </button>
    </div>
  );
};

export default AddComment;
