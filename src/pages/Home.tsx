import Button from "../ComponentPage/Button";
import InputKeyWord from "../ComponentPage/InputKeyWord";
import Slider from "../ComponentPage/Slider";
import Profile from "../ComponentPage/Profile";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  const [results, setResults] = useState<number>(15);

  const handleClick = (): void => {
    navigate("/results", { state: { results } });
  };
  return (
    <div className="w-full h-screen bg flex">
      <div className="flex-1 flex flex-col  items-center px-5 bg-black ">
        <div className="w-full max-w-[600px] mt-5 flex flex-col gap-7">
          <div className="visible  sm:invisible flex items-center text-[13px] font-bold tracking-[-1px] bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent h-[70px] ">
            LOGO
          </div>
          <h2 className="text-2xl font-normal text-white">Search</h2>
          <InputKeyWord />
          <div className="max-w-[725px] w-full  border border-b-white opacity-10 h-0.5"></div>
        </div>

        <div className="w-full max-w-[600px] flex flex-col mt-6 gap-7">
          <h2 className="text-2xl font-normal text-white">
            # Of Results Per Page
          </h2>
          <p className="text-white text-base font-normal">
            <span className="text-white text-5xl font-bold tracking-normal">
              {results}
            </span>{" "}
            results
          </p>
          <Slider onChangeValue={setResults} />
          <div className="max-w-[725px] w-full mt-2.5  border border-b-white opacity-10 h-0.5"></div>
        </div>

        <div className="w-full max-w-[600px] mt-64">
          <Button label="SEARCH" onClick={handleClick} />
        </div>
      </div>
      <div className="hidden 2xl:block max-w-[375px] w-full">
        <Profile />
      </div>
    </div>
  );
}

export default Home;
