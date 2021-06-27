const CommentList = ({ comments = [] }) => {
  const renderedComments = comments.map(({ id, content, status }) => {
    switch (status) {
      case "rejected":
        return <li key={id}>This comment has been rejected.</li>;

      case "pending":
        return <li key={id}>Awaiting Moderation...</li>;

      default:
        return <li key={id}>{content}</li>;
    }
  });

  return <ul style={{ listStyleType: "none" }}>{renderedComments}</ul>;
};

export default CommentList;
