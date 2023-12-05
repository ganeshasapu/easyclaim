import { Transition, Dialog } from "@headlessui/react";
import {
  CheckCircleIcon,
  CheckIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Fragment, useRef, useState } from "react";

const CurrentClaimFooter = (props: {
  urlSegment: string;
  similarClaims: SimilarClaim[];
}) => {
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [denyModalOpen, setDenyModalOpen] = useState(false);

  const approveButtonRef = useRef(null);
  const denyButtonRef = useRef(null);

  async function handleApproveClaim() {
    try {
      console.log(props.urlSegment);
      const url = "/api/approve_life/" + props.urlSegment;
      const response = await fetch(url);
      if (response.ok) {
        console.log("claim successfully approved");
      } else {
        throw new Error("could not approve claim");
      }
    } catch (error) {
      console.log("error approving claim");
    }
  }

  async function handleDenyClaim() {
    try {
      const url = "/api/deny_life/" + props.urlSegment;
      const response = await fetch(url);
      if (response.ok) {
        console.log("claim successfully denied");
      } else {
        throw new Error("could not deny claim");
      }
    } catch (error) {
      console.log("error denying claim");
    }
  }

  const precedents = props.similarClaims.map((similarClaim, i) => {
    const claimNumber = similarClaim.claim.claimNumber;
    return (
      <div className="flex items-center me-4">
        <input
          id={"inline-checkbox" + (i).toString()}
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label
          htmlFor={"inline-checkbox" + (i).toString()}
          className="ms-2 text-sm font-medium text-gray-900 "
        >
          {claimNumber}
        </label>
      </div>
    );
  });

  return (
    <>
      {/* Approve Claim Modal */}
      <Transition.Root show={approveModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={approveButtonRef}
          onClose={setApproveModalOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>

                    <hr className="h-px my-5 bg-gray-200 border-0 " />

                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Precedent(s) used to process this claim:
                    </label>
                    <div className="flex">
                      <div className="flex">
                        <div className="flex items-center me-4">
                         {precedents}
                        </div>
                      </div>
                    </div>

                    <hr className="h-px my-5 bg-gray-200 border-0" />

                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Additional Notes
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                      placeholder="Enter reason for approval..."
                    ></textarea>
                    <hr className="h-px my-5 bg-gray-200 border-0 " />
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Are you sure you want to approve this claim?
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:col-start-2"
                      onClick={async () => {
                        handleApproveClaim();
                        setApproveModalOpen(false);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => setApproveModalOpen(false)}
                      ref={approveButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* deny Claim Modal */}
      <Transition.Root show={denyModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={denyButtonRef}
          onClose={setDenyModalOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                      <XMarkIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <hr className="h-px my-5 bg-gray-200 border-0 " />
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Precedent(s) used to process this claim:
                    </label>
                    <div className="flex">
                      <div className="flex">
                        <div className="flex items-center me-4">
                          {precedents}
                        </div>
                      </div>
                    </div>
                    <hr className="h-px my-5 bg-gray-200 border-0 " />
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Additional Notes
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                      placeholder="Enter reason for denial..."
                    ></textarea>
                    <hr className="h-px my-5 bg-gray-200 border-0 " />
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Are you sure you want to deny this claim?
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
                      onClick={async () => {
                        handleDenyClaim();
                        setDenyModalOpen(false);
                      }}
                    >
                      Deny
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => setDenyModalOpen(false)}
                      ref={denyButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="text-black bg-gray-50 w-[90%] mx-auto h-[2vh] pt-12 flex justify-around items-center">
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={async () => {
            setApproveModalOpen(true);
          }}
        >
          Approve Claim
          <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={() => {
            setDenyModalOpen(true);
          }}
        >
          Deny Claim
          <XCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      ;
    </>
  );
};

export default CurrentClaimFooter;
