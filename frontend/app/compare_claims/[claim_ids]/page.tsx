"use client";

import { Menu, Popover } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CurrentClaimFooter from "@/app/components/CurrentClaimFooter";
import React from "react";
import ClaimCardHighlighted from "@/app/components/Cards/ClaimCardHighlighted";
import { highlightContext } from "@/utils";

const user = {
    name: "Stacy Grace",
    email: "stacy.grace@mail.securian.com",
    imageUrl:
        "/stacy.png",
};

export default function CompareClaimView({params}: {params: {claim_ids: string}}) {
    const [claim1, setClaim1Data] = useState<LifeClaim | null>(null);
    const [claim2, setClaim2Data] = useState<LifeClaim | null>(null);
    const [similar_claims, setSimilarClaims] = useState<SimilarClaim[] | null>(null);
    const [similarity_score, setSimilarityScore] = useState<number>(0.0);
    const [highlighted_claim, setHighlightedClaim] = useState<Object>({});
    const router = useRouter();

    const highlightClaims = async() => {
        const claim1_url = `/api/get_life/claim/${claim1_id}`;
        const claim1_data = await fetch(claim1_url).then((res) => res.json());
        const claim2_url = `/api/get_life/claim/${claim2_id}`;
        const claim2_data = await fetch(claim2_url).then((res) => res.json());
        setClaim1Data(claim1_data);
        setClaim2Data(claim2_data);
        const dict: any = {}

        for (const key in claim1_data) {
            if (key == "claimNumber") {
                dict[key] = (claim1_data[key] === claim2_data[key])
            } else if(key == "placeOfDeath") {
                dict[key] = (claim1_data[key] === claim2_data[key])
            } else if(key == "inquestHeld") {
                dict[key] = (claim1_data[key] === claim2_data[key])
            } else if(key == "autopsyPerformed") {
                dict[key] = (claim1_data[key] === claim2_data[key])
            } else if(key == "dateOccured") {
                dict[key] = dateThreshold(claim1_data[key], claim2_data[key])
            } else if(key == "medicalInformation") {
                const medicalInformation: any = {}
                for (const key2 in claim1_data[key]) {
                    medicalInformation[key2] = (claim1_data[key][key2] === claim2_data[key][key2])
                }
                dict[key] = medicalInformation

            } else if(key == "employmentInformation"){
                const employmentInformation: any = {}
                for (const key2 in claim1_data[key]) {
                    if (key2 == "dateLastWorked") {
                        employmentInformation[key2] = dateThreshold(claim1_data[key][key2], claim2_data[key][key2])
                    }
                    employmentInformation[key2] = (claim1_data[key][key2] === claim2_data[key][key2])
                }
                dict[key] = employmentInformation
            } else if (key == "generalLoanInformation"){
                const generalLoanInformation: any = {}
                for (const key2 in claim1_data[key]) {
                    if (key2 == "nameOfLendingInstitution") {
                        generalLoanInformation[key2] = (claim1_data[key][key2] === claim2_data[key][key2])
                    } else if (key2 == "lendingInstitutionProvince") {
                        generalLoanInformation[key2] = (claim1_data[key][key2] === claim2_data[key][key2])
                    } else{
                        const loan: any = {}
                        for (const key3 in claim1_data[key][key2]) {
                            if (key3 == "typeOrPurposeOfLoan") {
                                loan[key3] = (claim1_data[key][key2][key3] === claim2_data[key][key2][key3])
                            } else {
                                loan[key3] = moneyThreshold(claim1_data[key][key2][key3], claim2_data[key][key2][key3])
                            }
                        }
                        generalLoanInformation[key2] = loan
                    }
                }
                dict[key] = generalLoanInformation
        }
        setHighlightedClaim(dict)
    }
}


    const moneyThreshold = (inputMoney1: string, inputMoney2: string): string => {
        if (Math.abs(parseFloat(inputMoney1) - parseFloat(inputMoney2)) <= 1000) {
            return "#dcfce7"
        } else if (Math.abs(parseFloat(inputMoney1) - parseFloat(inputMoney2)) <= 10000) {
            return "#ffd7b3"
        } else{
            return "transparent"
        }
    }
    const dateThreshold = (inputDate1: string, inputDate2: string): string => {
        const parsedDate1 = new Date(inputDate1);
        const parsedDate2 = new Date(inputDate2);

        if (
          parsedDate1.getMonth() === parsedDate2.getMonth() &&
          parsedDate1.getFullYear() === parsedDate2.getFullYear()
        ) {
          return "#dcfce7"
        }
        else if (parsedDate1.getFullYear() === parsedDate2.getFullYear()) {
          return "#ffd7b3"
        }
        else {
          return "transparent"
        }
      }
      
        
    useEffect(() => {
        const getSimilarClaim = async (claim_id: string) => {
            const similar_claims_url = `/api/get_similar_life/${claim_id}`;
            const similar_claims = await fetch(similar_claims_url).then((res) => res.json());

            const findSimilarityScore = async () => {
                const similar_claim_score = await fetch(similar_claims_url).then((res) => res.json()).then((data) => {
                    return data.find((similarClaim: SimilarClaim) => similarClaim.claim.claimNumber === claim2_id).similarityScore
                })
                setSimilarityScore(similar_claim_score)
            }

            findSimilarityScore()


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
        highlightClaims();
    }, []);

    return (
        <>
        <highlightContext.Provider value={highlighted_claim}>
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
                                            <ArrowLeftIcon className="h-6 w-6 text-white" />
                                            <div className="text-white">Back</div>
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
                            <ClaimCardHighlighted claim_data={claim1} prefixString={"Current:"} width={'1'}
                                       isHistorical={false}/>


                            {/* Precedent Claim */}
                           <ClaimCardHighlighted claim_data={claim2} prefixString={"Precedent:"} width={'1'}
                                      isHistorical={false}/>
                            <div className="absolute top-[8.6rem] left-[78.5rem] h-10 w-10 rounded-lg flex items-center justify-center shadow-md p-4" style={{
                backgroundColor: `${similarity_score >= 75 ? "#0b9541" : similarity_score >= 50 ? "#e0911b" : "#c4221a"}`,
              }}><p className="text-[#dbeafe] font-bold text-sm">{similarity_score}%</p></div>
                        </div>
                    </div>
                              {/* Footer */}
                {claim1  && similar_claims ? (
                    <CurrentClaimFooter urlSegment={claim1_id} similarClaims={similar_claims!}/>
                ) : (
                    <div className="bg-gray-200 w-full animate-pulse h-[5vh] rounded-2xl" />
                )}
                </main>
            </div>
        </highlightContext.Provider>
        </>
    );
}
