"use client";

import { MapMarker } from "@/components/map-marker";
import { Button } from "@/components/ui/button";
import { ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";

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
