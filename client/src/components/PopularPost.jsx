import React from "react";
import { Link } from "react-router-dom";

const PopularPost = ({ popPost }) => {
  return (
    <Link to={`/${popPost._id}`}>
      {" "}
      <p style={{ color: "white" }}>{popPost.title}</p>{" "}
    </Link>
  );
};

export default PopularPost;
