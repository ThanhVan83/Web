import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../ComponentPage/Loading";

type typeTag = {
  id: string;
  name: string;
  results: string;
};

function TagsGrid() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Home");
  };
  const [tags, setTags] = useState<typeTag[]>([]);

  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tags")
      .then((res) => res.json())
      .then((data) => {
        setTags(data.tags);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="bg-black w-full h-full px-5">
      <div
        className="flex h-[70px] w-full items-center gap-3.5 cursor-pointer   sm:hidden "
        onClick={handleClick}
      >
        <i className="fa-solid fa-angle-left  text-white text-2xl"></i>
        <div className="text-white text-2xl font-normal">Home Page</div>
      </div>
      <div className="max-w-[900px] m-auto pt-20 ">
        <h1 className="text-[30px] text-white font-normal mb-5">Tags</h1>

        {isloading && (
          <div className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-80">
            <Loading />
          </div>
        )}

        <div className="grid max-sm:grid-cols-2 sm:grid-cols-5 gap-1">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="max-w-[150px] max-h-[200px] flex flex-col mb-3.5 "
            >
              <div className="w-full h-[150px] bg-[#1a1a1a] rounded-md flex justify-start items-end pl-2 pb-2 ">
                <div className="border-2 border-white text-white rounded-md px-3 py-1 text-2xl font-bold truncate max-w-[135px] h-[50px]">
                  {tag.name}
                </div>
              </div>

              <p className="text-white items-start text-[15px] font-normal mt-2  truncate max-w-[150px] w-full">
                {tag.name}
              </p>

              <p className="text-[#B2B2B2] self-start text-[11px] ">
                {tag.results}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TagsGrid;
