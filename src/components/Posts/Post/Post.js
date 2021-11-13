import moment from "moment";
import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setcurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <AiFillLike className="text-xl mr-2 " />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <AiOutlineLike className="text-xl mr-2 " />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <AiOutlineLike className="text-xl mr-2 " />
        &nbsp;Like
      </>
    );
  };

  return (
    <>
      <div className="card glass lg:card-side text-neutral-content mb-6 w-full lg:w-full md:w-full xl:w-3/4 h-full ">
        <figure className="p-6 relative lg:w-1/4">
          <div className="flex">
            <div className="flex flex-col  absolute sm:left-10 sm:top-10 left-10 top-10">
              <h3 className="text-gray-800 font-bold uppercase text-2xl">
                {post.name}
              </h3>
              <h1 className="text-gray-700 font-bold text-md">
                {moment(post.createdAd).fromNow()}
              </h1>
            </div>
            {(user?.result?.googleId === post?.creator ||
              user?.result?._id === post?.creator) && (
              <div className="absolute sm:right-10 sm:top-10 right-10 top-10">
                <button
                  className="btn bg-gray-700 hover:bg-gray-600 rounded-md border-none "
                  onClick={() => setcurrentId(post._id)}
                >
                  <BsThreeDots className="text-xl " />
                </button>
              </div>
            )}
          </div>

          <div className=" ">
            <img
              src={post.selectedFile}
              className="rounded-lg shadow-lg w-72 h-52 lg:w-64 lg:h-52  overflow-hidden"
              alt="img"
            />
          </div>
        </figure>
        <div className="max-w-md card-body lg:w-3/4">
          <h1 className="card-title text-3xl font-bold capitalize">
            {post.title}
          </h1>
          <h5 className="card-title text-sm lowercase font-semibold ">
            {post.tags.map((tag) => `#${tag} `)}
          </h5>

          <p className="text-md font-semibold capitalize">
            {post.message.slice(1, 80)} ...
          </p>

          <div className="card-actions">
            <div className="flex justify-between items-center w-full">
              <button
                className="btn glass rounded-xl font-bold "
                onClick={() => dispatch(likePost(post._id))}
                disabled={!user?.result}
              >
                {/* <AiFillLike className="text-xl mr-2 " /> LIKE {post.likeCount} */}
                <Likes />
              </button>
              {(user?.result?.googleId === post?.creator ||
                user?.result?._id === post?.creator) && (
                <button
                  className="btn glass rounded-xl "
                  onClick={() => dispatch(deletePost(post._id))}
                  disabled={!user?.result}
                >
                  <MdDelete className="text-xl mr-2 " /> Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
