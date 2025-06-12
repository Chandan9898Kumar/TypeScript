import ModifyComments from "./ModifyComments";
import styles from "./comment.module.css";
import { CommentData } from "./Utils";
import AddComment from "./AddComments";
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
      </div>

      {isReplyactive && (
        <AddComment
          setCommentList={handleReply}
          name="replyComment"
          label="Reply Now"
          placeholder="Reply To This Message"
        />
      )}

      {!!comment.replies.length &&
        comment.replies.map((item) => {
          return (
            <div key={item.id} className={styles.replyContainer}>
              {" "}
              <Comment
                comment={item}
                onReply={onReply}
                onDelete={onDelete}
                replyId={replyId}
                handleReply={handleReply}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Comment;
