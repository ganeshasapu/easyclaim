"use client"

import { useState } from "react"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'



export default function InitiateClaim({ params }: { params: { uid: string } }) {
    console.log("the dynamic route is " + params.uid)
    const [files, setFiles] = useState<File[]>([])
    const [fileNotFound, setFileNotFound] = useState(false);
    const [selection, setSelection] = useState<string>("Select Form Type");
    const [enableOcr, setEnableOcr] = useState<boolean>(false);

    function handleFile(e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement & {
            files: FileList;
        }
        console.log(target.files[0] instanceof File);
        setFiles([...files, target.files[0]]);
    }
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    function uploadFile() {
        if (files.length > 0) {
            try {
                const data: FormData = new FormData();
                data.append("file", files[files.length - 1] as Blob);
                data.append("uid", params.uid);
                data.append("fileName", selection);
                fetch("/claimant/uploadForm",
                    {
                        method: "POST",
                        body: data

                    }).then((res: Response) => {
                        if (res.ok) {
                            setEnableOcr(true)
                        }
                    })
            } catch (e) {
                console.log("there was an error uploading the file");
            }
        }
        else {
            setFileNotFound(true);
        }

    }

    function runOcr() {
        files.forEach((file: File) => {
            
        })
    }
    
    const DropDown = () => {
        
    
        return (
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {selection}
                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                </div>
    
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                    onClick={() => {setSelection("Life Claim Information Request")}}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Life Claim Information Request
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={() => {setSelection("Lender's Statement")}}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Lender's Statement
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={() => {setSelection("Certification of Death")}}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Certification of Death
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        )
    }

    return (
        <div>
            <form>
                <input type="file" name="file" onChange={handleFile}></input>
            </form>
            <button onClick={uploadFile}>
                submit file to S3 storage
            </button>
            <DropDown></DropDown>
            <div hidden={!fileNotFound}>please select a file</div>
            <button hidden={!enableOcr} onClick={runOcr}>run ocr on form</button>
        </div>

    )
}