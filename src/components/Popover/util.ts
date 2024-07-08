import { Dimensions } from "react-native";
import { HorizontalPlacement, VerticalPlacement } from "./type";

export const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } =
  Dimensions.get("window");

export const EXTRA_SPACING = 5;
export const BORDER_RADIUS = 10;
export const POPOVER_WIDTH = 200;

export const shadowStyle = {
  elevation: 3,
  shadowColor: "#000000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.15,
  shadowRadius: 5,
};

export const flipPlacement = (
  placement: VerticalPlacement | HorizontalPlacement
) => {
  switch (placement) {
    case VerticalPlacement.ABOVE:
      return VerticalPlacement.BELOW;
    case VerticalPlacement.BELOW:
      return VerticalPlacement.ABOVE;
    case HorizontalPlacement.LEFT:
      return HorizontalPlacement.RIGHT;
    case HorizontalPlacement.RIGHT:
      return HorizontalPlacement.LEFT;
    default:
      return placement;
  }
};
