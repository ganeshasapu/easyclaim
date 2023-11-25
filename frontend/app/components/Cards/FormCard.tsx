
const FormCard = (props:{ text: string }) => {
  return (
    <div className="transition flex flex-col justify-center items-center w-1/4-screen h-1/4-screen rounded-lg bg-white text-black shadow-lg hover:scale-105 hover:bg-slate-50">
      <div className=" font-semibold text-center mb-2">
        {props.text}
      </div>
      <div className=" text-center">
        Click to view PDF
      </div>
    </div>
  );
};

export default FormCard;