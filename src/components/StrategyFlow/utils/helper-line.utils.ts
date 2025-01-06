import type { Node, NodeChange, NodePositionChange } from "@xyflow/react";

interface SnapGuides {
	horizontals: number[];
	verticals: number[];
	snapPosition: {
		x?: number;
		y?: number;
	};
}

interface NodeBounds {
	left: number;
	right: number;
	top: number;
	bottom: number;
	width: number;
	height: number;
}

export function calculateHelperLines<T extends Node>(
	change: NodePositionChange,
	allNodes: T[],
	threshold = 10,
): SnapGuides {
	// 初始化辅助线数据
	const guides: SnapGuides = {
		horizontals: [],
		verticals: [],
		snapPosition: {
			x: undefined,
			y: undefined,
		},
	};

	// 查找目标节点
	const currentNode = allNodes.find((node) => node.id === change.id);
	if (!currentNode || !change.position) return guides;

	// 计算目标节点的边界
	const targetBounds: NodeBounds = {
		left: change.position.x,
		right: change.position.x + (currentNode.measured?.width ?? 0),
		top: change.position.y,
		bottom: change.position.y + (currentNode.measured?.height ?? 0),
		width: currentNode.measured?.width ?? 0,
		height: currentNode.measured?.height ?? 0,
	};

	let minVerticalDist = threshold;
	let minHorizontalDist = threshold;

	for (const compareNode of allNodes) {
		if (compareNode.id === currentNode.id) continue;

		const compareBounds: NodeBounds = {
			left: compareNode.position.x,
			right: compareNode.position.x + (compareNode.measured?.width ?? 0),
			top: compareNode.position.y,
			bottom: compareNode.position.y + (compareNode.measured?.height ?? 0),
			width: compareNode.measured?.width ?? 0,
			height: compareNode.measured?.height ?? 0,
		};

		// 检查垂直对齐
		const leftDiff = Math.abs(targetBounds.left - compareBounds.left);
		if (leftDiff < minVerticalDist) {
			guides.snapPosition.x = compareBounds.left;
			guides.verticals = [...guides.verticals, compareBounds.left];
			minVerticalDist = leftDiff;
		}

		const rightDiff = Math.abs(targetBounds.right - compareBounds.right);
		if (rightDiff < minVerticalDist) {
			guides.snapPosition.x = compareBounds.right - targetBounds.width;
			guides.verticals = [...guides.verticals, compareBounds.right];
			minVerticalDist = rightDiff;
		}

		const leftToRightDiff = Math.abs(targetBounds.left - compareBounds.right);
		if (leftToRightDiff < minVerticalDist) {
			guides.snapPosition.x = compareBounds.right;
			guides.verticals = [...guides.verticals, compareBounds.right];
			minVerticalDist = leftToRightDiff;
		}

		const rightToLeftDiff = Math.abs(targetBounds.right - compareBounds.left);
		if (rightToLeftDiff < minVerticalDist) {
			guides.snapPosition.x = compareBounds.left - targetBounds.width;
			guides.verticals = [...guides.verticals, compareBounds.left];
			minVerticalDist = rightToLeftDiff;
		}

		// 检查水平对齐
		const topDiff = Math.abs(targetBounds.top - compareBounds.top);
		if (topDiff < minHorizontalDist) {
			guides.snapPosition.y = compareBounds.top;
			guides.horizontals = [...guides.horizontals, compareBounds.top];
			minHorizontalDist = topDiff;
		}

		const bottomToTopDiff = Math.abs(targetBounds.bottom - compareBounds.top);
		if (bottomToTopDiff < minHorizontalDist) {
			guides.snapPosition.y = compareBounds.top - targetBounds.height;
			guides.horizontals = [...guides.horizontals, compareBounds.top];
			minHorizontalDist = bottomToTopDiff;
		}

		const bottomDiff = Math.abs(targetBounds.bottom - compareBounds.bottom);
		if (bottomDiff < minHorizontalDist) {
			guides.snapPosition.y = compareBounds.bottom - targetBounds.height;
			guides.horizontals = [...guides.horizontals, compareBounds.bottom];
			minHorizontalDist = bottomDiff;
		}

		const topToBottomDiff = Math.abs(targetBounds.top - compareBounds.bottom);
		if (topToBottomDiff < minHorizontalDist) {
			guides.snapPosition.y = compareBounds.bottom;
			guides.horizontals = [...guides.horizontals, compareBounds.bottom];
			minHorizontalDist = topToBottomDiff;
		}
	}

	return guides;
}

export default calculateHelperLines;
