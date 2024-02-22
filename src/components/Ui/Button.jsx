const Button = ({ onClick, text }) => {
  return (
    <button
      className="p-2 text-white border border-white shadow-[5px_5px_0px_0px_rgba(109,40,217)] hover:bg-white  hover:text-black active:bg-slate-700"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
