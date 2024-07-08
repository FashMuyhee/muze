import React from 'react';
import { SCREEN_WIDTH } from '../util';
import { HorizontalPlacement } from '../type';

type Params = {
  placement: HorizontalPlacement;
  targetXPosition: number;
  objectWidth: number;
  targetW?: number;
};

export const useHorizontalPlacement = ({ placement, targetXPosition, objectWidth, targetW }: Params): HorizontalPlacement => {
  const measure = () => {
    const x = objectWidth + targetXPosition;

    // check for non centered content
    if (placement != HorizontalPlacement.CENTER) {
      if (placement == HorizontalPlacement.LEFT) {
        if (objectWidth > targetXPosition) {
          return HorizontalPlacement.RIGHT;
        }
        return placement;
      }

      if (x < SCREEN_WIDTH) return placement;
      return HorizontalPlacement.LEFT;
    }

    // check if no enough space towards the left
    if (objectWidth * 0.5 > targetXPosition) return HorizontalPlacement.RIGHT;
    // check if no enough space towards the right
    const remRightScreen = SCREEN_WIDTH - targetXPosition;
    if (remRightScreen < objectWidth * 0.5) return HorizontalPlacement.LEFT;

    return placement;
  };

  return React.useMemo(measure, [placement, targetXPosition, objectWidth, targetW]);
};
