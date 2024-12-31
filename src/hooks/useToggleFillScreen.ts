import { useMemoizedFn } from "ahooks";
import { useEffect, useRef, useState } from "react";

export default function useToggleFillScreen() {
	const elementRef = useRef<HTMLDivElement>(null);
	const [isFullscreen, setIsFullscreen] = useState(false);

	const toggleFullscreen = useMemoizedFn(() => {
		if (elementRef.current) {
			if (!isFullscreen) {
				elementRef.current.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		}
	});

	useEffect(() => {
		const abortController = new AbortController();
		document.addEventListener(
			"fullscreenchange",
			() => {
				setIsFullscreen(document.fullscreenElement === elementRef.current);
			},
			{ signal: abortController.signal },
		);

		return () => {
			abortController.abort();
		};
	}, []);

	return { elementRef, isFullscreen, toggleFullscreen };
}
