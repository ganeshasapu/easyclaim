"use client"

import { useState } from "react"

export default function InitiateClaim() {
    const [file, setFile] = useState<File>()

    function handleFile(e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement & {
            files: FileList;
        }
        console.log(target.files[0] instanceof File)
    }
    return (
        <div>
            <form>
                <input type="file" name="file" onChange={handleFile}></input>
            </form>
        </div>
        
    )
}