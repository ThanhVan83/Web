import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate, useLocation } from "react-router-dom";

function Tags() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSelected, setIsSelected] = useState<"Home" | "Tag">("Home");

  const menu = [
    { name: "Home", icon: "fa-home", path: "/home" },
    { name: "Tag", icon: "fa-tags", path: "/tags" },
  ];

  const handleClick = (item: any) => {
    navigate(item.path);
  };

  useEffect(() => {
    if (location.pathname.startsWith("/tags")) {
      setIsSelected("Tag");
    } else {
      setIsSelected("Home");
    }
  }, [location.pathname]);

  const hideonMobile =
    location.pathname.startsWith("/tags") ||
    location.pathname.startsWith("/results");

  return (
    <div
      className={`${hideonMobile ? "hidden sm:flex" : "flex"}
    fixed bottom-0 w-full h-[60px] sm:h-auto sm:static sm:w-20 bg-[#1B1B1B] flex flex-row sm:flex-col justify-center sm:justify-start items-center py-2 sm:py-4`}
    >
      <div className="hidden sm:flex justify-center items-center text-[13px] font-bold tracking-[-1px] bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent h-[88px]">
        LOGO
      </div>

      <div className="flex flex-row justify-center sm:flex-col items-center sm:space-y-6 space-x-8 sm:space-x-0">
        {menu.map((item) => (
          <div
            key={item.name}
            onClick={() => handleClick(item)}
            className="flex flex-col items-center cursor-pointer"
          >
            <i
              className={`fa-solid ${
                item.icon
              } text-2xl transition-all duration-300 ${
                isSelected === item.name
                  ? "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            ></i>

            <span
              className={`hidden sm:block mt-1 text-[10px] h-[12px] transition-all duration-300 ${
                isSelected === item.name
                  ? "opacity-100 text-white"
                  : "opacity-0 text-transparent"
              }`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tags;
