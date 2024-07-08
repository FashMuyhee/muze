import React from 'react';
import { SCREEN_WIDTH } from '../util';
import { HorizontalPlacement } from '../type';

type Params = {
  placement: HorizontalPlacement;
  targetXPosition: number;
  objectWidth: number;
  targetW: number;
};

export const useHorizontalPlacement = ({ placement, targetXPosition, objectWidth, targetW }: Params): HorizontalPlacement => {

  const measure = () => {
    const remRightScreen = SCREEN_WIDTH - targetXPosition;
    const remLeftScreen = SCREEN_WIDTH - remRightScreen;

    // check for non centered content
    if (placement != HorizontalPlacement.CENTER) {
      // for content flowing to left
      if (placement == HorizontalPlacement.LEFT) {
        // if both left and right is small
        if (objectWidth > remLeftScreen && objectWidth > remRightScreen) {
          return HorizontalPlacement.CENTER;
        }
        // if no available space to the left
        if (targetW + remLeftScreen < objectWidth) {
          return HorizontalPlacement.RIGHT;
        }

        return placement;
      }

      // for content flowing to right
      if (placement == HorizontalPlacement.RIGHT) {
        // if both left and right is small
        if (objectWidth > remLeftScreen && objectWidth > remRightScreen) {
          return HorizontalPlacement.CENTER;
        }
        // if no available space to the right
        if (targetW + remRightScreen < objectWidth) {
          return HorizontalPlacement.LEFT;
        }
        return placement;
      }
    }

    return placement;
  };

  return React.useMemo(measure, [placement, targetXPosition, objectWidth, targetW]);
};
