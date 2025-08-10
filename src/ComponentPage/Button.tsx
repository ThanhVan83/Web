type ButtonProps = {
  label: string;
  onClick: () => void;
};

function Button({ label, onClick }: ButtonProps) {
  return (
    <div>
      <button
        className="max-w-[335px] w-full h-[40px] bg-white text-[#121212] border border-transparent rounded-sm font-bold text-sm hover:text-white hover:bg-[#121212] hover:border-white transition-colors duration-300 uppercase"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
