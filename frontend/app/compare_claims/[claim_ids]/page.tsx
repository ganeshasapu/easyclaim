"use client";

import { Menu, Popover } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClaimCard from "@/app/components/Cards/ClaimCard";
import CurrentClaimFooter from "@/app/components/CurrentClaimFooter";

const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export default function CompareClaimView({params}: {params: {claim_ids: string}}) {
    const [claim1_data, setClaim1Data] = useState<LifeClaim | null>(null);
    const [claim2_data, setClaim2Data] = useState<LifeClaim | null>(null);
    const [similar_claims, setSimilarClaims] = useState<SimilarClaim[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getSimilarClaim = async (claim_id: string) => {
          const similar_claims_url = `/api/get_similar_life/${claim_id}`;
          const similar_claims = await fetch(similar_claims_url).then((res) => res.json());
    
          if (similar_claims.error) {
            console.error(similar_claims.error);
            return;
          }
    
          similar_claims.sort(
            (a: SimilarClaim, b: SimilarClaim) => b.similarityScore - a.similarityScore
          );
    
          setSimilarClaims(similar_claims);
        };
        getSimilarClaim(claim1_id);
      }, []);
    
  

    if (!params.claim_ids) {
        return <div>Missing info</div>
    }

    const claim1_id = params.claim_ids.substring(0,6);
    const claim2_id = params.claim_ids.substring(9);

    useEffect(() => {
        const getLifeClaim = async (claim_id: string, claim1 : boolean) => {
            const claim_url = `/api/get_life/claim/${claim_id}`;
            const claim_data = await fetch(claim_url).then((res) => res.json());

            if (claim_data.error) {
                console.error(claim_data.error);
                return;
            }
            if (claim1) {
                setClaim1Data(claim_data);
            }else {
                setClaim2Data(claim_data);
            }
        };

        getLifeClaim(claim1_id, true);
        getLifeClaim(claim2_id, false);
    }, []);

    return (
        <>
            <div className="min-h-full bg-gray-50">
                <Popover as="header" className="bg-[#0b9541] pb-24">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                <div className="relative flex items-center justify-center py-5 lg:justify-between">
                                    {/* Logo */}
                                    <div className="absolute left-0 flex-shrink-0 lg:static flex">
                                        <button
                                            className="flex gap-2"
                                            onClick={() => {
                                                router.back();
                                            }}
                                        >
                                            <ArrowLeftIcon className="h-6 w-6" />
                                            <div>Back</div>
                                        </button>
                                    </div>

                                    {/* Right section on desktop */}
                                    <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-4 flex-shrink-0">
                                            <div>
                                                <Menu.Button className="relative flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                                </Menu.Button>
                                            </div>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                                    <div className="grid grid-cols-3 items-center gap-8">
                                        <div className="col-span-2">
                                            <nav className="flex space-x-4"></nav>
                                        </div>
                                        <div>
                                            <div className="mx-auto w-full max-w-md"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Popover>
                <main className="-mt-24 pb-8">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h1 className="sr-only">Page title</h1>
                        {/* Main 2 column grid */}
                        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-8">
                            {/* Current Claim */}
                            <ClaimCard claim_data={claim1_data} prefixString={"Current:"} width={'1'}
                                       isHistorical={false}/>

                            {/* Precedent Claim */}
                           <ClaimCard claim_data={claim2_data} prefixString={"Precedent:"} width={'1'}
                                      isHistorical={false}/>
                        </div>
                    </div>
                              {/* Footer */}
                {claim1_data  && similar_claims ? (
                    <CurrentClaimFooter urlSegment={claim1_id} similarClaims={similar_claims!}/>
                ) : (
                    <div className="bg-gray-200 w-full animate-pulse h-[5vh] rounded-2xl" />
                )}
                </main>
            </div>
        </>
    );
}
