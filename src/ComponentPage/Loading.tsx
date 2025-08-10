import Lottie from "lottie-react";
import loadingAnimation from "../assets/Ripple loading animation.json";
function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
}

export default Loading;
