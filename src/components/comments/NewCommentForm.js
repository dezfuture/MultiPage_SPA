import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const { sendRequest, status, error } = useHttp(addComment);

  const commentTextRef = useRef();

  //they give access to the currently active comment in the url and can be used im any component
  // did this because the addComment() func. in api.js needs the active quote id
  const params = useParams();
  // but this means we can only access this particular component in the active url section and not anywhere else which do not include the quote id
  // so we decide to get the quote id through props

  //we EXPECT THIS Function from out props so we destructure it
  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;
    // optional: Could validate here
    sendRequest({ text: enteredText });
    // send comment to server
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
