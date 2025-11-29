"use client";

import { useRef } from "react";

export default function useDebounce(delay = 500) {
    const lastCall = useRef(0);

    function canCall() {
        const now = Date.now();
        if (now - lastCall.current < delay) return false;

        lastCall.current = now;
        return true;
    }

    return { canCall };
}