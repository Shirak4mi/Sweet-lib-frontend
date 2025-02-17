/* useMeasure Hook Types */
export type TUseMeasureRect = Pick<DOMRectReadOnly, "x" | "y" | "top" | "left" | "right" | "bottom" | "height" | "width">;

export type TUseMeasureResult<E extends Element = Element> = [TUseMeasureRef<E>, TUseMeasureRect];

export type TUseMeasureRef<E extends Element = Element> = (element: E) => void;
/* useMeasure Hook Types */

export type TWindowObjSize = {
  width: number | undefined;
  height: number | undefined;
};
