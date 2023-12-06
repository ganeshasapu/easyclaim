import { useRouter } from "next/navigation";

const SimilarClaimCard = ({
  title,
  dateOccured,
  status,
  score,
  claim_id,
  inbox_claim_id
}: {
  title: string;
  dateOccured: string;
  status: string;
  score: number;
  claim_id: string;
  inbox_claim_id: string
}) => {
  const router = useRouter();

  const navigateToClaim = () => {
    router.push(`/compare_claims/${inbox_claim_id},${claim_id}`);
  }
  return (
    <button className="flex w-full justify-around gap-4 text-black" onClick={navigateToClaim}>
      <div className="border border-gray-150 rounded-lg my-2 flex-grow p-4 hover:bg-gray-50 active:bg-gray-100">
        <div className="px-5 py-2">
          <h1 className="py-2 font-semibold text-base">{title}</h1>
        </div>
        <div className="px-6 pb-4 divide-y divide-gray-200">
          <div className="flex justify-between py-2">
            <p>Date Occured: </p>
            <p>{dateOccured}</p>
          </div>

          <div className="flex justify-between py-2">
            <p>Status: </p>
            <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium" style={{backgroundColor: `${status == "Approved" ? "#dcfce7" : "#fcb3ae"}`}}>
              <svg className="h-1.5 w-1.5" viewBox="0 0 6 6" aria-hidden="true">
                <circle cx={3} cy={3} r={3} />
              </svg>
              {status}
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[90%] bg-gray-200 rounded-full dark:bg-gray-200">
            <div
              className=" text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{
                width: `${score}%`,
                backgroundColor: `${score >= 75 ? "#0b9541" : score >= 50 ? "#e0911b" : "#c4221a"}`,
              }}
            >
              {score + "%"}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default SimilarClaimCard;
