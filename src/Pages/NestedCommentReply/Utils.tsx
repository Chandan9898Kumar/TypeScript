export interface CommentData {
  id: number;
  author: string;
  date: string;
  text: string;
  replies: CommentData[]; // Add this line to allow nested replies
}

export const getUniqueId = ():number => {
  return new Date().getTime();
};

export const getDate = () => {

  const now = new Date();

  const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
    .getHours()
    .toString()
    .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  return formattedDate;
};

export const handleReplyById = (
  comments: CommentData[],
  repliedId: number | null,
  replyItems: CommentData
): CommentData[] => {
  
  return comments.map((item) => {
    if (item.id === repliedId) {
      item.replies.push(replyItems);
    }
    if (item.replies && item.replies.length) {
      item.replies = handleReplyById(item.replies, repliedId, replyItems);
    }

    return item;
  });
};

export const deleteCommentById = (
  comments: CommentData[],
  commentId: number | null
) => {
  return comments.filter((comment) => {
    if (comment.id === commentId) {
      return false;
    }

    if (comment.replies.length) {
      comment.replies = deleteCommentById(comment.replies, commentId);
    }

    return true;
  });
};
