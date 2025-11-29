"use client";

import CopyForm from "./components/CopyForm";
import CopyPreview from "./components/CopyPreview";
import ImproveResult from "./components/ImproveResult";
import TranslateResult from "./components/TranslateResult";
import HistoryPanel from "./components/HistoryPanel";
import useAI from "./hooks/useAI";
import LoadingBar from "./components/LoadingBar";
import CooldownBanner from "./components/CooldownBanner";
import useScrollToResult from "./hooks/useScrollToResult";
import MobileHistory from "./components/MobileHistory";

export default function Home() {
	const {
		result,
		improved,
		translated,
		loading,
		cooldown,
		generate,
		improve,
		translate,
		history,
		clear,
		clearImproved,
		clearTranslated
	} = useAI();
	const scrollRef = useScrollToResult(result, improved, translated);

	return (
		<>
			<main className="max-w-lg mx-auto p-6 space-y-6">
				<h1 className="text-3xl font-bold text-center">
					Smart UI Copy Assistant
				</h1>
				{loading && <LoadingBar />}
				<CopyForm onGenerate={generate} />
				<CooldownBanner cooldown={cooldown} />
				<div ref={scrollRef}>
					<CopyPreview ideas={result} onImprove={improve} onTranslate={translate} />
					<ImproveResult text={improved} onTranslate={translate} onClose={clearImproved} />
					<TranslateResult data={translated} onClose={clearTranslated} />
				</div>
			</main>
			<aside className="hidden lg:block lg:col-span-1 sticky top-6 h-fit">
				<HistoryPanel history={history} onClear={clear} />
			</aside>
			<MobileHistory />
		</>
	);
}