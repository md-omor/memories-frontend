import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setcurrentId }) => {
  const [postData, setpostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setpostData(post);
  }, [post]);

  const clear = () => {
    setcurrentId(null);
    setpostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));

      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <div className="flex items-center justify-center  px-4 py-6">
        <h1 className="text-center text-lg font-bold text-gray-50">
          Please Sign In to create your own memories and like other's memories
        </h1>
      </div>
    );
  }

  return (
    <form action="" autoComplete="off" onSubmit={handleSubmit}>
      <div className="text-white font-bold text-center text-2xl from-accent-focus  font-mono">
        {currentId ? "Editing" : "Creating"}
      </div>
      <div className="form-control">
        {/* <label class="label">
        <span class="label-text">Normal</span>
      </label> */}
        {/* <input
          type="text"
          placeholder="Creator"
          name="Creator"
          className="input input-accent input-bordered mt-6"
          value={postData.creator}
          onChange={(e) =>
            setpostData({ ...postData, creator: e.target.value })
          }
        /> */}
        <input
          type="text"
          placeholder="title"
          name="title"
          className="input input-accent input-bordered mt-6"
          value={postData.title}
          onChange={(e) => setpostData({ ...postData, title: e.target.value })}
        />
        <textarea
          type="text"
          rows="4"
          cols="50"
          placeholder="message"
          name="message"
          className="input input-accent input-bordered mt-6 h-32 pt-4"
          value={postData.message}
          onChange={(e) =>
            setpostData({ ...postData, message: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="tags"
          name="tags"
          className="input input-accent input-bordered mt-6"
          value={postData.tags}
          onChange={(e) =>
            setpostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
      </div>
      <div className="mt-6">
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setpostData({ ...postData, selectedFile: base64 })
          }
        />
      </div>
      <button class="btn   mt-6 w-full glass" type="submit">
        Submit
      </button>
      <button
        class="btn btn-secondary  mt-6 w-full "
        type="reset"
        onClick={clear}
      >
        Clear
      </button>
    </form>
  );
};

export default Form;
