'use client'
import CurrentClaimView from "@/app/components/CurrentClaimView";
import HistoricalClaimView from "@/app/components/HistoricalClaimView";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ClaimViewPage({
  params,
}: {
  params: { claim_id: string };
}) {

  const [claim_data, setClaimData] = useState<LifeClaim | null>(null);

  if (!params) {
    return <div>No claim ID found</div>;
  }

  const claim_id = params.claim_id;
  if (!claim_id){
    return <div>No claim ID found</div>
  }

  useEffect(() => {
    const getLifeClaim = async (claim_id: string) => {
      const url = `http://localhost:3000/api/get_life/claim/${claim_id}`;
      const data = await fetch(url).then((res) => res.json());

      if (data.error) {
        console.error(data.error);
      }
      setClaimData(data);
    };
    getLifeClaim(claim_id);
  }, []);


  if (!claim_data) {
    return <div>No claim data found</div>;
  }


  return (
    <div>
      {claim_data.status == "Recieved" ? (
        <CurrentClaimView lifeclaim={claim_data} claim_id={claim_id} />
      ) : (
        <HistoricalClaimView lifeclaim={claim_data} />
      )}
    </div>
  );
}
