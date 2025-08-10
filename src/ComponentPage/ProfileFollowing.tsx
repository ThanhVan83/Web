import ButtonContained from "./ButtonContained";
import ButtonOutline from "./ButtonOutline";
import { useState, useEffect } from "react";
import Loading from "./Loading";

type User = {
  id: string;
  image: string;
  fullname: string;
  username: string;
  isFollower: boolean;
  isFollowing: boolean;
};

function ProfileFollowing() {
  const [users, setUsers] = useState<User[]>([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setIsLoading(false);
      });
  }, []);

  const followingUsers = users.filter((user) => user.isFollowing);

  const toggleFollow = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  return (
    <div>
      {isloading ? (
        <Loading />
      ) : (
        followingUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-[#1B1B1B] text-white w-full max-w-[375px]"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.image}
                alt="avatar"
                className="w-10 h-10 rounded-[5px] border object-cover"
              />
              <div>
                <div className="font-semibold leading-tight text-base">
                  {user.fullname}
                </div>
                <div className="text-sm text-gray-400">{user.username}</div>
              </div>
            </div>

            {user.isFollowing ? (
              <ButtonContained
                label="Following"
                onClick={() => toggleFollow(user.id)}
              />
            ) : (
              <ButtonOutline
                label="Follow"
                onClick={() => toggleFollow(user.id)}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ProfileFollowing;
