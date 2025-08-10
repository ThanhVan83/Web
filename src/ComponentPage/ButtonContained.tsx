type ButtonContainedProps = {
  label: string;
  onClick: () => void;
};

function ButtonContained({ label, onClick }: ButtonContainedProps) {
  return (
    <div>
      <button
        className="w-auto bg-white text-[#121212] text-xs font-semibold border border-transparent rounded-[20px]  py-2 px-2.5
                  hover:bg-[#121212] hover:text-white hover:border-white  transition-colors duration-300
        "
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export default ButtonContained;
