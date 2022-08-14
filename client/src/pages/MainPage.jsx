import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopularPost from "../components/PopularPost";
import PostsItem from "../components/PostsItem";
import { getAllPosts } from "../redux/features/post/postSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((stata) => stata.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return <h1>Постов нет</h1>;
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {posts.map((post) => {
            return <PostsItem key={post._id} post={post} />;
          })}
        </div>

        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">Популярное:</div>
          {popularPosts.map((popPost) => (
            <PopularPost key={popPost._id} popPost={popPost} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
