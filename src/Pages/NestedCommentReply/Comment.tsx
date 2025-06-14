import { useState } from "react";
import AddComment from "./AddComments";
import styles from "./comment.module.css";
import ModifyComments from "./ModifyComments";
import { CommentData } from "./Utils";
interface CommentProps {
  comment: CommentData;
  onReply: (id: number) => void;
  onDelete: (id: number) => void;
  handleReply: (elements: CommentData) => void;
  replyId: number | null;
}

const Comment = ({
  comment,
  onReply,
  onDelete,
  handleReply,
  replyId,
}: CommentProps) => {
  const [expand, setExapnd] = useState<boolean>(false);
  const isReplyactive = replyId === comment.id;

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.head}>
          <h3>
            {comment.author}
            {"  "} {" : "}
            {comment?.date}
          </h3>
          <ModifyComments
            id={comment.id}
            onReply={onReply}
            onDelete={onDelete}
          />
        </div>
        <div className={styles.text}>{comment.text}</div>
        <div className={styles.expand}>
          {!!comment.replies.length && (
            <button className={styles.expandButton} onClick={() => setExapnd(!expand)}>
              {expand ? "collapse" : " Expand"}
            </button>
          )}
        </div>
      </div>

      {isReplyactive && (
        <AddComment
          setCommentList={handleReply}
          name="replyComment"
          label="Reply Now"
          placeholder="Reply To This Message"
        />
      )}
      <div className={styles.replyContainer}>
        {!!comment.replies.length &&
          expand &&
          comment.replies.map((item) => {
            return (
              <Comment
                key={item.id}
                comment={item}
                onReply={onReply}
                onDelete={onDelete}
                replyId={replyId}
                handleReply={handleReply}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Comment;
