import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import TestEntries from "./test_entries";

export default async function Index() {
    const supabase = createServerComponentClient({ cookies });
    const { data: tests } = await supabase.from("tests").select();
    return (
        <>
            <div className="text-white">Test Entries:</div>
            <TestEntries serverTests={tests ?? []} />
        </>
    );
}
