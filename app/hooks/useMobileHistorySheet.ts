"use client";

import { useState, useEffect } from "react";

export default function useMobileHistorySheet() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function checkSize() {
            setIsMobile(window.innerWidth < 1024);
        }
        checkSize();
        window.addEventListener("resize", checkSize);
        return () => window.removeEventListener("resize", checkSize);
    }, []);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return { isOpen, open, close, isMobile };
}