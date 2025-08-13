import Profile from "../ComponentPage/Profile";
import { useEffect, useState, useRef, useCallback } from "react";
import Button from "../ComponentPage/Button";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../ComponentPage/Loading";
type typeResults = {
  id: string;
  title: string;
  username: string;
  image: string;
};

function Results() {
  const [photos, setPhotos] = useState<typeResults[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isInfiniteMode, setIsInfiniteMode] = useState<Boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const initialVisible: number = location.state?.results ?? 9;
  const [visibleCount, setVisibleCount] = useState<number>(initialVisible);

  const lastPhotoRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !isInfiniteMode) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, isInfiniteMode]
  );

  useEffect(() => {
    if (page === 1) {
      setIsInitialLoading(true);
      setIsLoading(true);
    }

    fetch(`/api/photos?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setPhotos((prev) => [...prev, ...data.photos]);
        setHasMore(data.photos.length > 0);
        setIsInitialLoading(false);
        setIsLoading(false);
      });
  }, [page]);

  const displayedPhotos: typeResults[] = isInfiniteMode
    ? photos
    : photos.slice(0, visibleCount);

  const handleClick = (): void => {
    navigate("/Home");
  };

  return (
    <div className="flex w-full h-screen bg-black">
      {isInitialLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <Loading />
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-y-auto px-4 py-6">
        <div className="max-w-[750px] w-full mx-auto flex flex-col h-full mt-4">
          <div className="flex items-center mb-10 sm:hidden">
            <i
              className="fa-solid fa-angle-left text-white text-2xl cursor-pointer"
              onClick={handleClick}
            ></i>
            <h2 className="text-white text-[30px] font-normal leading-none">
              Home Page
            </h2>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <i
              className="!hidden sm:!block fa-solid fa-angle-left text-white text-2xl cursor-pointer"
              onClick={handleClick}
            ></i>
            <h2 className="text-white text-[30px] font-normal leading-none">
              Results
            </h2>
          </div>

          <div className="flex-1 flex flex-col relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 justify-items-center">
              {displayedPhotos.map((photo, index: number) => {
                const isLast = index === displayedPhotos.length - 1;
                return (
                  <div
                    key={`${photo.id}-${index}`}
                    ref={isInfiniteMode && isLast ? lastPhotoRef : null}
                    className="h-full"
                  >
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-[335px] h-[222px] object-cover rounded-md sm:w-[219px] sm:h-[146px]"
                    />
                    <div className="mt-2">
                      <p className="text-white text-[15px]">{photo.title}</p>
                      <p className="text-gray-400 text-[11px]">
                        {photo.username}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {isInfiniteMode && (
              <div ref={lastPhotoRef} className="flex justify-center py-4">
                {isLoading && <Loading />}
              </div>
            )}

            {!isInfiniteMode && hasMore && (
              <div className="mt-4">
                <Button
                  label="More"
                  onClick={() => {
                    setIsInfiniteMode(true);
                    setPage((prev) => prev + 1);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hidden 2xl:block max-w-[375px] w-full">
        <Profile />
      </div>
    </div>
  );
}

export default Results;
