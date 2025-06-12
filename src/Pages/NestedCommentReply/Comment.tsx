import ModifyComments from './ModifyComments'

const Comment = ({ comment, onReply, onDelete, handleReply, replyId }) => {
  const isReplyactive = replyId === comment.id;

  return (
    <div>
      <div className="main">
        <div className="head">
          <h3>
            {comment.author}
            {'  '} {' : '}
            {comment?.date}
          </h3>
          <ModifyComments
            id={comment.id}
            onReply={onReply}
            onDelete={onDelete}
          />
        </div>
        <div className="text">{comment.text}</div>
      </div>

      {isReplyactive && (
        <AddComment
          setCommentList={handleReply}
          label="Reply Now"
          placeholder="Reply To This Message"
        />
      )}

      {!!comment.replies.length &&
        comment.replies.map((item) => {
          return (
            <div key={item.id} style={{ padding: '0px 20px' }}>
              {' '}
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