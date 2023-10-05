"use client";

import supabase from "@/utils/supabase";
import { useState } from "react";

export interface Test {
    id: number;
    created_at: string;
    number: number;
}

export default function TestEntries({ serverTests }: { serverTests: Test[] }) {

    const [entries, setEntries] = useState(serverTests);

    async function createNewEntry() {
        const newTest = {
            id: entries.length + 1,
            created_at: new Date().toISOString(),
            number: Math.floor(Math.random() * 1000)
        } as Test

        supabase.from("tests").insert([newTest]).then(() => {
            console.log("New entry created");
        });
        // const {data, error} = await supabase.rpc("set_test_entry")
        // console.log(data, error)
        setEntries([...entries, newTest]);
    }


    return (
        <div>
            {entries.map((test: Test) => (
                <div key={test.id}>
                    <div className="text-white">Test {test.id}</div>
                    <div className="text-white">
                        Created at: {test.created_at}
                    </div>
                    <div className="text-white">
                        Number: {test.number}
                    </div>
                </div>
            ))}
            <button className="bg-white" onClick={createNewEntry}>
                Create New Entry
            </button>
        </div>
    );
}
