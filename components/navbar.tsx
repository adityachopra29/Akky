"use client";

import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useAccount, useConnect } from "wagmi";

export default function Navbar() {
    const pathname = usePathname();

    const { connect, connectors } = useConnect();
    const {isConnected, address} = useAccount();
    return (

        <div className="flex flex-row items-center justify-between border-b py-2">
            <p className="text-xl font-bold">Akky</p>
            {!isConnected ? (

<button  onClick={() => connect({connector: connectors[0]})}>
  Connect Metamask
</button>
): (
  <p>{address}</p>
)}
        </div>
    )
}