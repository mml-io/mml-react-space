import React, { Children, cloneElement, ReactElement } from "react";

import { GroupProps } from "../../types";

type ChildComponentProps = {
  level?: number;
};

type FloorProps = GroupProps & {
  level?: number;
  children?:
    | ReactElement<ChildComponentProps>
    | ReactElement<ChildComponentProps>[];
};

export default function Level({ level, children, ...groupProps }: FloorProps) {
  const childrenWithLevel = Children.map(
    children as React.ReactElement[],
    (child) => {
      return cloneElement(child as ReactElement<any>, { level });
    },
  );

  return <m-group {...groupProps}>{childrenWithLevel}</m-group>;
}
