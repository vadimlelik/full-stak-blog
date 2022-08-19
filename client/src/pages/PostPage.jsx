import axios from "./../utils/axios";
import React, { useCallback, useState } from "react";
import { removePost } from "../redux/features/post/postSlice";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import Moment from "react-moment";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  createComment,
  getPostComments,
} from "../redux/features/comments/commentsSlice";
import CommentItem from "../components/CommentItem";

const PostPage = () => {
  const [post, setPosts] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const [comment, setComment] = useState("");
  const params = useParams();
  const postId = params.id;

  console.log(comments);

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${postId}`);
    setPosts(data);
  }, [postId]);

  const handleSubmit = () => {
    try {
      dispatch(createComment({ postId, comment }));
      setComment("");
    } catch (error) {}
  };
  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(postId));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, postId]);

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id));
      toast("пост удален  ID " + params.id);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!post) {
    return <h1>Постов нет </h1>;
  }

  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
        <Link to={"/"}> go back</Link>
      </button>

      <div className="flex gap-100 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? "flex rouded-sm h-80" : "flex rounded-sm"
              }
            >
              {post?.imgUrl && (
                <img
                  src={`http://localhost:3002/${post.imgUrl}`}
                  alt="img"
                  className="object-cover w-full"
                />
              )}
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="text-xs text-white opacity-50">
                {post.username}
              </div>
              <div className="text-xs text-white opacity-50">
                <Moment date={post.createdAt} format="D MMM YYYY" />
              </div>
            </div>
            <div className="text-white text-xl">{post.title}</div>
            <p className="text-white opacity-60 text-xs pt-4 ">{post.text}</p>

            <div className="flex gap-3 items-center mt-2 justify-between">
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                  <AiFillEye /> <span>{post.views}</span>
                </button>
                <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                  <AiOutlineMessage />{" "}
                  <span>{post.comments?.length || 0} </span>
                </button>
              </div>
              {user?._id === post.author && (
                <div className="flex gap-3 mt-4">
                  <button className="flex items-center justify-center gap-2 text-white opacity-50">
                    <Link to={`/${params.id}/edit`}>
                      <AiTwotoneEdit />
                    </Link>
                  </button>
                  <button
                    onClick={removePostHandler}
                    className="flex items-center justify-center gap-2 text-white opacity-50"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm ">
          <form className="flex gap-2 " onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment"
              className="text-balck w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex justify-center items-center bg-gray-600 text-white rounded-sm py-2 px-4"
            >
              {" "}
              Отправить{" "}
            </button>
          </form>
          {comments?.map((cmt) => (
            <CommentItem key={cmt._id} cmt={cmt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
