import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

const Posts = ({setcurrentId}) => {
  const posts = useSelector((state) => state.posts);

  console.log(posts);
  return (
    <div className="w-full">
      {posts.map((post) => (
        <div className=" flex items-start justify-start flex-col w-full">
          <Post post={post} setcurrentId={setcurrentId} />
          {/* <Post />
          <Post />
          <Post />
          <Post />
          <Post /> */}
        </div>
      ))}
    </div>
  );
};

export default Posts;
