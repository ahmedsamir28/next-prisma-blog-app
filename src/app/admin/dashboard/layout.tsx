import type { Metadata } from "next";



export const metadata: Metadata = {
    title: "Admin dashBoard",
    description: "admin dashboard to handle proccess of articles",
};

export default function AdminDashBoardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-[calc(70vh-100px)] ">
            <header className="bg-gray-100 text-white p-4 shadow w-full">
                <h1 className="text-2xl font-bold text-black container m-auto">Admin Dashboard ...</h1>
            </header>

            <div className=" container m-auto">
                {children}

            </div>
        </div>
    );
}
