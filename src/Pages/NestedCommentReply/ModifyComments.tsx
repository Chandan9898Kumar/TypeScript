import styles from "./comment.module.css";

interface ModifyCommentsProps {
  id: number;
  onReply: (id: number) => void;
  onDelete: (id: number) => void;
}

const ModifyComments = ({ id, onReply, onDelete }: ModifyCommentsProps) => {
  return (
    <div className={styles.btns}>
      <button
        className={styles.reply}
        onClick={() => {
          onReply(id);
        }}
      >
        Reply
      </button>
      <button
        className={styles.delete}
        onClick={() => {
          onDelete(id);
        }}
      >
        Delete
      </button>
    </div>
  );
};
export default ModifyComments;
