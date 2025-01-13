import { branchListAtom } from "@/state/atoms";
import { useAtomValue } from "jotai";
import React from "react";

export const GitGraphWrapper = () => {
  const branchList = useAtomValue(branchListAtom);

  const maxStep = Math.max(...branchList.map((b) => b.originStep + b.length));

  const BRANCH_HEIGHT = 50;
  const SVG_HEIGHT = branchList.length * BRANCH_HEIGHT + 50;
  const SVG_WIDTH = maxStep * 20 + 1000;

  const colors = ["#22c55e", "#0ea5e9", "#f97316", "#ef4444", "#a855f7"];

  return (
    <svg
      width={SVG_WIDTH}
      height={SVG_HEIGHT}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full overflow-x-scroll"
    >
      {branchList.map((branch, index) => {
        const yPosition = index * BRANCH_HEIGHT + BRANCH_HEIGHT + 20;
        const branchColor = colors[index % colors.length];

        return (
          <React.Fragment key={branch.name}>
            {branch.originFrom !== "root" && (
              <line
                x1={branch.originStep * 10}
                y1={
                  branchList.findIndex((b) => b.name === branch.originFrom) *
                    BRANCH_HEIGHT +
                  BRANCH_HEIGHT
                }
                x2={branch.originStep * 10}
                y2={yPosition}
                stroke="#ccc"
                strokeDasharray="5,5"
              />
            )}

            <line
              x1={branch.originStep * 10}
              y1={yPosition}
              x2={(branch.originStep + branch.length) * 10}
              y2={yPosition}
              stroke={branchColor}
              strokeWidth="4"
            />

            <text
              x={branch.originStep * 10 + branch.length * 10}
              y={yPosition + 25}
              textAnchor="end"
              alignmentBaseline="middle"
              fill={branchColor}
            >
              {branch.name}
            </text>

            <circle
              cx={branch.originStep * 10}
              cy={yPosition}
              r="5"
              fill={branchColor}
            />
            <circle
              cx={(branch.originStep + branch.length) * 10}
              cy={yPosition}
              r="5"
              fill={branchColor}
            />
          </React.Fragment>
        );
      })}
    </svg>
  );
};
