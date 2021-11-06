import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
function App() {
  const [currentId, setcurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div className="bg-gray-800 h-max w-full overflow-hidden">
      <div className="container mx-auto px-10 ">
        <div className="flex justify-between items-center py-8">
          <h1 className="text-white">Md Omor</h1>
          <button className="text-white">Login</button>
        </div>

        <div className="md:flex justify-between  ">
          <div className=" md:w-3/6 lg:w-2/3 xl:w-3/4 w-full sm:flex sm:justify-center md:flex md:justify-between">
            <Posts setcurrentId={setcurrentId} />
          </div>
          <div className=" md:w-2/5 lg:w-1/4 xl:w-1/4 w-full">
            <Form currentId={currentId} setcurrentId={setcurrentId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
