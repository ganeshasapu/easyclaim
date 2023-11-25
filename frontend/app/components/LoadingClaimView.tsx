import LoadingIcon from "./LoadingIcon"
import Image from "next/image";

const LoadingClaimView = () => {
    return (
      <div className="flex w-screen h-screen items-center justify-center bg-white">
        <Image width={300} height={100} src={"/securian_logo_text.png"} alt={"Securian Logo"}  />
        <LoadingIcon />
      </div>
    );
}


export default LoadingClaimView;
