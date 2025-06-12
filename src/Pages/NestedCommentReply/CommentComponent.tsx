import { useState, useCallback } from "react";
import Comment from "./Comment";
import AddComment from "./AddComments";
import { CommentData } from "./Utils";
import { deleteCommentById, handleReplyById } from "./Utils";

const CommentSection = () => {
  const [comments, setComments] = useState<CommentData[]>([
    {
      id: 1,
      author: "Jane Doe",
      date: "2023-05-15",
      text: "This is a great article!",
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

  const [replyId, setReplyId] = useState<number | null>(null);

  const handelSetComments = useCallback((commentList: CommentData) => {
    setComments((prevList) => [...prevList, commentList]);
  }, []);

  const handleDeleteComment = (commentId: number) => {
    setComments((prevComment) => deleteCommentById(prevComment, commentId));
  };

  const handleSetReplyId = (id: number) => {
    setReplyId(id);
  };

  const handleReply = (replyItems: CommentData) => {
    setComments((prevComments) =>
      handleReplyById(prevComments, replyId, replyItems)
    );
    setReplyId(null);
  };

  return (
    <>
      <h1>Nested Reply And Comment Section</h1>
      <AddComment
        name="addComment"
        setCommentList={handelSetComments}
        label="ADD COMMENT"
        placeholder="Enter your comment here"
      />

      {comments?.map((comment) => {
        return (
          <Comment
            key={comment?.id}
            comment={comment}
            onReply={handleSetReplyId}
            onDelete={handleDeleteComment}
            handleReply={handleReply}
            replyId={replyId}
          />
        );
      })}
    </>
  );
};

export default CommentSection;
