"use client";

import React, { useState, useEffect, useRef } from "react";
import NET from "vanta/dist/vanta.net.min.js";
import * as THREE from "three";

const VantaBackground = ({ children }: { children: React.ReactNode }) => {
	const [vantaEffect, setVantaEffect] = useState<any>(null);
	const myRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!vantaEffect) {
			setVantaEffect(
				NET({
					el: myRef.current,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					minHeight: 200.0,
					minWidth: 200.0,
					scale: 1.0,
					scaleMobile: 1.0,
					color: 0xffffff,
					backgroundColor: 0x0,
					points: 8.0,
					maxDistance: 18.0,
					spacing: 14.0,
					vertexColors: true,
					THREE: THREE,
				})
			);
		}
		return () => {
			if (vantaEffect) vantaEffect.destroy();
		};
	}, [vantaEffect]);

	return (
		<div
			ref={myRef}
			style={{
				position: "absolute",
				width: "100%",
				height: "100%",
				zIndex: -1,
			}}
		>
			{/* Overlay con fondo semitransparente */}
			<div
				style={{
					position: "absolute",
					width: "100%",
					height: "100%",
					backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro con 50% de opacidad
					zIndex: 0,
				}}
			></div>

			{/* Contenido de la página */}
			<div style={{ position: "relative", zIndex: 1 }}>{children}</div>
		</div>
	);
};

export default VantaBackground;
