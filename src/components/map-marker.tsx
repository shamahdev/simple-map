import { renderToStaticMarkup } from "react-dom/server";
import { Marker } from "react-simple-maps";

function TooltipContent({ title }: { title: string }) {
	return (
		<div className="p-2 rounded shadow">
			<p className="font-mono">{title}</p>
		</div>
	);
}

export function MapMarker({
	coordinates,
	title,
}: { coordinates: [number, number]; title: string }) {
	return (
		<Marker
			coordinates={coordinates}
			data-tooltip-id="map-tooltip"
			data-tooltip-html={renderToStaticMarkup(TooltipContent({ title }))}
			data-tooltip-place="top"
		>
			<g
				fill="#FF5533"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				transform="translate(-12, -24)"
			>
				<circle cx="12" cy="10" r="3" />
				<path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
			</g>
			<text
				textAnchor="middle"
				y={10}
				className="text-[10px] font-mono text-neutral-800"
			>
				{title}
			</text>
		</Marker>
	);
}
