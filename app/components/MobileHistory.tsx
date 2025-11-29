"use client";

import { History } from "lucide-react";
import useMobileHistorySheet from "../hooks/useMobileHistorySheet";
import HistoryPanel from "./HistoryPanel";
import useHistory from "../store/useHistory";

export default function MobileHistory() {
    const { history, clear } = useHistory();
    const { isMobile, isOpen, open, close } = useMobileHistorySheet();

    if (!isMobile) return null;

    return (
        <>
            {!isOpen && (
                <button
                    onClick={open}
                    className="fixed bottom-6 right-6 z-50 bg-pink-700 hover:bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
                >
                    <History className="w-4 h-4" />
                    History
                </button>
            )}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex items-end"
                    onClick={close}
                >
                    <div
                        className="bg-[#111] w-full rounded-t-2xl p-4 max-h-[70vh] overflow-y-auto animate-slideUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-right mb-2">
                            <button
                                onClick={close}
                                className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                            >
                                Close
                            </button>
                        </div>
                        <HistoryPanel history={history} onClear={clear} />
                    </div>
                </div>
            )}
        </>
    );
}