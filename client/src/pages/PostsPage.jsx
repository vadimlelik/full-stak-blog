import axios from "../utils/axios.js";
import { useState } from "react";
import { useEffect } from "react";
import PostItem from "../components/PostsItem.jsx";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data } = await axios.get("/posts/user/me");
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!posts) {
    return (
      <div className="text-xl text-center text-white py-10">Loading...</div>
    );
  }
  return (
    <div className="w-1/2 mx-auto  py-10 flex flex-col gap-10">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostsPage;
