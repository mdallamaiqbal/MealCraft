import React from 'react';
import { redirect } from "next/navigation";
import { getUserSession, User } from '../lib/session/session';
import { DashboardSidebar } from '../components/dashboard/DashbaordSidebar';


interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
    const session = await getUserSession();
   const user = session as User | undefined;
    const userRole = user?.role?.toLowerCase();
    if (!userRole || (userRole !== "admin" && userRole !== "moderator")) {
        redirect("/");
    }

    return (
        <div className='sm:flex min-h-screen'>
            <DashboardSidebar />
            <div className='flex-1'>{children}</div>
        </div>
    );
};

export default DashboardLayout;