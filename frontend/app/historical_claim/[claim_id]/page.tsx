"use client";

import { Menu, Popover } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClaimCard from "@/app/components/Cards/ClaimCard";
import HistoricalClaimFooter from "@/app/components/HistoricalClaimFooter";

const user = {
    name: "Stacy",
    email: "tom@example.com",
    image: "/public/stacy.png",
    imageUrl: "https://i0.wp.com/www.sfnwseries.com/wp-content/uploads/2017/11/team-1-4-person-circle-p2-200-1.png?ssl=1",
};

export default function HistoricalClaimView({params}: {params: {claim_id: string}}) {
    const [claim_data, setClaimData] = useState<LifeClaim | null>(null);
    const router = useRouter();

    if (!params.claim_id) {
        return <div>Missing info</div>
    }

    const claim_id = params.claim_id;

    useEffect(() => {
        const getLifeClaim = async (claim_id: string) => {
            const claim_url = `/api/get_life/claim/${claim_id}`;
            const claim_data = await fetch(claim_url).then((res) => res.json());

            if (claim_data.error) {
                console.error(claim_data.error);
                return;
            }
            setClaimData(claim_data);
        };

        getLifeClaim(claim_id);
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
                            {/* Historical Claim */}
                            <ClaimCard claim_data={claim_data} prefixString={"Historical:"} width={'2'}
                                       isHistorical={true}/>
                        </div>
                    </div>
                </main>
                <Popover as="header" className="bg-[#0b9541] pb-24">
                </Popover>
            </div>
        </>
    );
}
