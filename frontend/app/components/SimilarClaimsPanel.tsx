import SimilarClaimCard from "./Cards/SimilarClaimCard";

const SimilarClaimsPanel = ({similar_claims, inbox_claim_id}: {similar_claims: SimilarClaim[] | null,
    inbox_claim_id: string}) => {
    return (
      <>
        <div className="sticky top-0 border-b-2 border-gray-100 bg-white px-2 py-3 sm:px-6">
          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <h1 className="text-lg font-medium leading-6 text-gray-900">Similar Claims</h1>
            </div>
          </div>
        </div>
        {/* Similar Claims Cards */}
        {similar_claims ? (
          similar_claims.map((s) => (
            <SimilarClaimCard
              key={s.claim.claimNumber}
              claim_id={s.claim.claimNumber}
              inbox_claim_id={inbox_claim_id}
              title={"Claim #: " + s.claim.claimNumber}
              dateOccured={s.claim.dateOccured}
              status={s.claim.status}
              score={s.similarityScore}
            />
          ))
        ) : (
          <div className="flex flex-col gap-4">
            <div className="bg-gray-200 w-full animate-pulse h-[25vh] rounded-2xl" />
            <div className="bg-gray-200 w-full animate-pulse h-[25vh] rounded-2xl" />
            <div className="bg-gray-200 w-full animate-pulse h-[25vh] rounded-2xl" />
          </div>
        )}
      </>
    );
}

export default SimilarClaimsPanel;
