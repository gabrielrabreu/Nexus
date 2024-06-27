import React, { PropsWithChildren } from "react";
import classnames from "classnames";

interface GridProps extends PropsWithChildren {
  cols?: number;
  rows?: number;
}

const _Grid: React.FC<GridProps> = ({ cols = 1, rows = 1, children }) => {
  const gridClasses = classnames("grid", "gap-2");

  const gridStyles = {
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
  };

  return (
    <div className={gridClasses} style={gridStyles}>
      {children}
    </div>
  );
};

const Grid = _Grid;

export { Grid };
