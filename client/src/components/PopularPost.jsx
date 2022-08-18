import React from "react";
import { Link } from "react-router-dom";

const PopularPost = ({ popPost }) => {
  return (
    <div className="bg-gray-600 my-1">
      <Link
        to={`/${popPost._id}`}
        className="flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
      >
        {" "}
        {popPost.title}
      </Link>
    </div>
  );
};

export default PopularPost;
