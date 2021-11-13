import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Form from "../../components/Form/Form";
import Posts from "../../components/Posts/Posts";

function Home() {
  const [currentId, setcurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div className="md:flex justify-between  ">
      <div className=" md:w-3/6 lg:w-2/3 xl:w-3/4 w-full sm:flex sm:justify-center md:flex md:justify-between">
        <Posts setcurrentId={setcurrentId} />
      </div>
      <div className=" md:w-2/5 lg:w-1/4 xl:w-1/4 w-full">
        <Form currentId={currentId} setcurrentId={setcurrentId} />
      </div>
    </div>
  );
}

export default Home;
