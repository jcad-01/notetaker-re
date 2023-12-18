import { signIn, signOut, useSession } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";

export async function Header () {
    const session = await getServerAuthSession();

    return (
        <div className="navbar bg-primary text-primary-content">
            <div className="flex-1 pl-5 text-3xl font-bold">
                {session?.user?.name ? `Notes for ${session.user.name}` : ""}
            </div>
        </div>
    )
}