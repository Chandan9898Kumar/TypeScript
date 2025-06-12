const ModifyComments = ({ id, onReply, onDelete }) => {
  return (
    <div className="btns">
      <button
        className="reply"
        onClick={() => {
          onReply(id);
        }}
      >
        Reply
      </button>
      <button
        className="delete"
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