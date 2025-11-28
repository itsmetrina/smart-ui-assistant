"use client";

import { useEffect, useRef, useState } from "react";
import CopyForm from "./components/CopyForm";
import CopyPreview from "./components/CopyPreview";
import ImproveResult from "./components/ImproveResult";
import TranslateResult from "./components/TranslateResult";

export default function Home() {
	const [result, setResult] = useState([]);
	const [improved, setImproved] = useState("");
	const [translated, setTranslated] = useState(null);
	const resultRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (resultRef.current) {
			resultRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [result, improved, translated]);

	async function improveCopy(text: string) {
		const res = await fetch("/api/improve", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text })
		});
		const data = await res.json();
		setImproved(data.improved);
	}

	async function translateCopy(text: string) {
		const res = await fetch("/api/translate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text }),
		});
		const data = await res.json();
		setTranslated(data);
	}

	return (
		<main className="max-w-lg mx-auto p-6 space-y-6">
			<h1 className="text-3xl font-bold">
				Smart UI Copy Assistant
			</h1>
			<CopyForm onResult={setResult} />
			<div ref={resultRef}>
				<CopyPreview
					ideas={result}
					onImprove={improveCopy}
					onTranslate={translateCopy}
				/>
				<ImproveResult text={improved} onClose={() => setImproved("")} />
				<TranslateResult data={translated} onClose={() => setTranslated(null)} />
			</div>
		</main>
	);
}