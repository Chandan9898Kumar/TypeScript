import { ChangeEvent, useState, memo } from "react";
import { getDate, getUniqueId } from "./Utils";
import { CommentData } from "./Utils";
import styles from "./comment.module.css";
interface AddCommentProps {
  setCommentList: (commentItems: CommentData) => void;
  label?: string;
  placeholder?: string;
  name: string;
}

const AddComment = ({
  setCommentList,
  label = "ADD COMMENT",
  placeholder = "Enter your comment here",
  name,
}: AddCommentProps) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    <div className={styles.addComment}>
      <input
        className={styles.input}
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={handleCommentChange}
        value={commentText}
      />
      {"  "}
      <button
        disabled={!commentText.trim().length}
        type="button"
        className={styles.button}
        onClick={handleAddComment}
      >
        {label}
      </button>
    </div>
  );
};

export default memo(AddComment);
