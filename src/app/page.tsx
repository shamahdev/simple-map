import { IndonesiaMap } from "@/components/indonesia-map";
import { WorldMap } from "@/components/world-map";

export default function Home() {
	return (
		<main className="flex flex-col w-full max-w-screen-xl gap-4 bg-neutral-50 mx-auto p-8">
			<p className="font-mono">World Map</p>
			<WorldMap />
			<p className="font-mono">Indonesia Map</p>
			<IndonesiaMap />
		</main>
	);
}
