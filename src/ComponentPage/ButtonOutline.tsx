type ButtonOutLineProps = {
  label: string;
  onClick: () => void;
};

function ButtonOutline({ label, onClick }: ButtonOutLineProps) {
  return (
    <div>
      <button
        className="w-auto bg-[#121212] text-white text-xs font-semibold rounded-[20px] border border-white py-2 px-2.5
                  hover:bg-white hover:text-[#121212]  transition-colors duration-300
        "
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export default ButtonOutline;
