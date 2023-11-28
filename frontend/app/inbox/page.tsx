import Link from "next/link";

export default function Inbox() {
    return (
        <main className="flex h-screen w-full flex-col items-center justify-between">
            <div className="flex w-full p-4 items-center border-b border-white">
                <div className="flex w-full items-center justify-evenly p-2 gap-8">
                    <div
                        className="py-2 border rounded w-full px-4 bg-green-50 text-black text-center font-bold"

                    >
                        Inbox
                    </div>

                    <Link
                        className="py-2 border rounded w-full px-4 text-center"
                        href={"/database"}
                    >
                        Database
                    </Link>
                </div>
                <div className="flex">
                    <div className="rounded-full bg-green-300 w-10 h-10" />
                </div>
            </div>
            <div className="w-full h-full flex">
                <div className="w-[20vw] h-full bg-gray-50"></div>
                <div className="w-full h-full text-white p-4">
                    <h1 className="text-3xl font-bold">Claims to Process</h1>

                    <div className="shadow-sm overflow-hidden my-8">
                        <table className="border-collapse table-auto w-full text-sm">
                            <thead>
                            <tr>
                                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Claim ID</th>
                                <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Claim Amount</th>
                                <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Claim Type</th>
                                <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Month</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-800">
                            <tr>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Claim ID</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">Claim Amount</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Claim Type</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Month</td>
                            </tr>
                            <tr>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Claim ID</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">Claim Amount</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Claim Type</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Month</td>
                            </tr>
                            <tr>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Claim ID</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">Claim Amount</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Claim Type</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Month</td>
                            </tr>
                            <tr>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Claim ID</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">Claim Amount</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Claim Type</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Month</td>
                            </tr>
                            <tr>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Claim ID</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">Claim Amount</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Claim Type</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Month</td>
                            </tr>
                            <tr>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Claim ID</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">Claim Amount</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Claim Type</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Month</td>
                            </tr>
                            <tr>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Claim ID</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">Claim Amount</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Claim Type</td>
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">Month</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </main>
    );
}
