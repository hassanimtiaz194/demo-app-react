import React from "react";
import { Line } from "rc-progress";


function ProgressBar({
  title,
  percentage,
  strokeColor,
  strokeLinecap,
  style,
  trailWidth,
  strokeWidth,
}) {
  const renderedTitle = title
? title.replace("{percentage}", percentage)
    : false;
  return (
    <div style={{ width: "100%" }}>
      {renderedTitle ? <h2 style={{textAlign:"center"}}>{renderedTitle}</h2> : null}
      <Line
        strokeWidth={strokeWidth}
        percent={percentage}
        trailWidth={trailWidth}
        strokeColor={strokeColor}
        strokeLinecap={strokeLinecap}
        style={style}
      />
    </div>
  );
}

export default ProgressBar;

