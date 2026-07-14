import { getUserSession, User } from "@/app/lib/session/session";
import { LayoutSideContentLeft } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { History, Image, Users, LucideIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers"; 

interface NavItem {
    icon: LucideIcon;
    href: string;
    label: string;
}

export async function DashboardSidebar() {
    const headerList = await headers();
    const pathname = headerList.get("x-current-path") || "/dashboard"; 
    
    const session = await getUserSession();
    const user = session as User | undefined;
    const userRole = user?.role?.toLowerCase();

    if (!userRole || (userRole !== "admin" && userRole !== "moderator")) {
        redirect("/");
    }

    const navLinksMap: NavItem[] = [
        { icon: Users, href: "/dashboard", label: "Profile Management" },
        { icon: Image, href: "/dashboard/user/boughtArtworks", label: "Bought Artworks" },
        { icon: History, href: "/dashboard/user/purchaseHistory", label: "Purchase History" }
    ];

    const navContents = (
        <nav className="flex flex-col gap-1">
            {navLinksMap.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors text-white
                            ${isActive ? 'bg-black' : 'hover:bg-black'}
                        `}
                    >
                        <item.icon className={`size-5 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
                {navContents}
            </aside>
            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContentLeft />
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContents}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}