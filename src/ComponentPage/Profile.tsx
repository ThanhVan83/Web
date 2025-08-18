import { useState } from "react";
import ProfileFollower from "../ComponentPage/ProfileFollower";
import ProfileFollowing from "./ProfileFollowing";

const Profile = () => {
  const [isSelected, setIsSelected] = useState<"followers" | "following">(
    "followers"
  );

  return (
    <div className="bg-[rgb(27,27,27)] max-w-[375px] w-full h-[961px] overflow-y-scroll">
      <div className="w-full flex pt-8 sticky top-0 bg-[rgb(27,27,27)] z-10">
        <div
          className={`w-1/2 h-[33px] text-base text-center font-bold cursor-pointer ${
            isSelected === "followers"
              ? "text-white border-b-2 border-white"
              : "text-gray-500 border-b-2 border-[#1F1F1F]"
          }`}
          onClick={() => setIsSelected("followers")}
        >
          Followers
        </div>
        <div
          className={`w-1/2 h-[33px] text-base text-center font-bold cursor-pointer ${
            isSelected === "following"
              ? "text-white border-b-2 border-white"
              : "text-gray-500 border-b-2 border-[#1F1F1F]"
          }`}
          onClick={() => setIsSelected("following")}
        >
          Following
        </div>
      </div>

      <div>
        {isSelected === "followers" ? (
          <ProfileFollower />
        ) : (
          <ProfileFollowing />
        )}
      </div>
    </div>
  );
};

export default Profile;
