import ButtonContained from "./ButtonContained";
import ButtonOutline from "./ButtonOutline";
import { useState, useEffect, useRef, useCallback } from "react";
import Loading from "./Loading";

type User = {
  id: string;
  image: string;
  fullname: string;
  username: string;
  isFollower: boolean;
  isFollowing: boolean;
};

function ProfileFollower() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const toggleFollow = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  const lastUserRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    fetch(`/api/users?page=${page}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        if (ignore) return;
        setUsers((prev) => [...prev, ...data.users]);
        setHasMore(data.users.length > 0);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));

    return () => {
      ignore = true;
    };
  }, [page]);

  const followers = users.filter((u) => u.isFollower);

  return (
    <div>
      {followers.length === 0 && !isLoading && (
        <div className="p-4 text-gray-400">No followers yet</div>
      )}

      {followers.map((user, index) => {
        const isLast = index === followers.length - 1;
        return (
          <div
            key={user.id}
            ref={isLast ? lastUserRef : null}
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
        );
      })}

      {isLoading && (
        <div className="flex justify-center py-4">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default ProfileFollower;
