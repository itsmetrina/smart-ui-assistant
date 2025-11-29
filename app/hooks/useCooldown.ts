"use client";

import { useEffect, useState } from "react";

export default function useCooldown() {
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        if (cooldown <= 0) return;
        const interval = setInterval(() => {
            setCooldown((prev) => {
                if (prev <= 0.1) return 0;
                return Number((prev - 0.1).toFixed(1));
            });
        }, 100);
        return () => clearInterval(interval);
    }, [cooldown]);

    function startCooldown(seconds: number) {
        setCooldown(Number(seconds.toFixed(1)));
    }
    
    return { cooldown, startCooldown };
}