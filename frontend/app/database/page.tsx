import Link from "next/link";

export default function Database() {
    return (
        <main className="flex h-screen w-full flex-col items-center justify-between">
            <div className="flex w-full p-4 items-center border-b border-white">
                <div className="flex w-full items-center justify-evenly p-2 gap-8">
                    <Link
                        className="py-2 border rounded w-full px-4 text-center"
                        href={"/inbox"}
                    >
                        Inbox
                    </Link>
                    <div
                        className="py-2 border rounded w-full px-4 bg-green-50 text-black text-center font-bold"

                    >
                        Database
                    </div>
                </div>
                <div className="flex">
                    <div className="rounded-full bg-green-300 w-10 h-10" />
                </div>
            </div>
            <div className="w-full h-full flex">
                <div className="w-[20vw] h-full bg-gray-50"></div>
                <div className="w-full h-full text-white p-4">
                    <h1 className="text-3xl font-bold">Historical Claims</h1>
                </div>
            </div>
        </main>
    );
}
