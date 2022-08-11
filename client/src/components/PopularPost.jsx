import React from "react";
import { Link } from "react-router-dom";

const PopularPost = ({ popPost }) => {
  console.log(popPost);
  return (
    <Link to={`/post/${popPost._id}`}>
      <div className="bg-gray-600 my-1 ">
        <div className="flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white">
          <p>{popPost.text}</p>
        </div>
      </div>
    </Link>
  );
};

export default PopularPost;
