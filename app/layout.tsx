import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Smart UI Copy Assistant",
	description: "AI-powered UX microcopy generator",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#0a0a0a] text-[#ededed]`}
			>
				<div className="min-h-screen p-6 lg:p-10">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}