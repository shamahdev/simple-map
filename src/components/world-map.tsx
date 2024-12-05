"use client";

import { Button } from "@/components/ui/button";
import { ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
	ComposableMap,
	Geographies,
	Geography,
	Marker,
	ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";

function TooltipContent({ title }: { title: string }) {
	return (
		<div className="p-2 rounded shadow">
			<p className="font-mono">{title}</p>
		</div>
	);
}

function MapMarker({
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

export function WorldMap() {
	const [position, setPosition] = useState({
		coordinates: [0, 0] as [number, number],
		zoom: 1,
	});

	function handleZoomIn() {
		if (position.zoom >= 4) return;
		setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
	}

	function handleZoomOut() {
		if (position.zoom <= 1) return;
		setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
	}

	function handleMoveEnd(position: {
		coordinates: [number, number];
		zoom: number;
	}) {
		setPosition(position);
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="bg-white rounded shadow relative">
				<div className="flex gap-2 absolute top-2 left-4 z-10">
					<Button size="icon" onClick={handleZoomIn}>
						<ZoomInIcon />
					</Button>
					<Button size="icon" onClick={handleZoomOut}>
						<ZoomOutIcon />
					</Button>
				</div>
				<Tooltip id="map-tooltip" />
				<ComposableMap>
					<ZoomableGroup
						zoom={position.zoom}
						center={position.coordinates}
						onMoveEnd={handleMoveEnd}
					>
						<Geographies geography="/world.json">
							{({ geographies }) =>
								geographies.map((geo) => (
									<Geography
										className="hover:opacity-50 focus:outline-none hover:border-white"
										fill="#e6efe9"
										key={geo.rsmKey}
										geography={geo}
									/>
								))
							}
						</Geographies>
						<MapMarker coordinates={[-101, 53]} title="Canada" />
						<MapMarker coordinates={[-102, 38]} title="USA" />
						<MapMarker coordinates={[-103, 25]} title="Mexico" />
					</ZoomableGroup>
				</ComposableMap>
			</div>
		</div>
	);
}
