import React from 'react';
import { SCREEN_HEIGHT } from '../util';
import { VerticalPlacement } from '../type';

type Params = {
  placement: VerticalPlacement;
  targetYPosition: number;
  objectHeight: number;
  targetH: number;
};

export const useVerticalPlacement = ({ placement, targetYPosition, objectHeight, targetH }: Params): VerticalPlacement => {
  const measure = () => {
    // for below placement
    if (placement == VerticalPlacement.BELOW) {
      // calculate remaining distance
      const y = targetYPosition + objectHeight + targetH;
      if (y > SCREEN_HEIGHT) {
        return VerticalPlacement.ABOVE;
      }
      return placement;
    }

    if (objectHeight > targetYPosition) {
      return VerticalPlacement.BELOW;
    }

    return placement;
  };

  return React.useMemo(measure, [placement, targetYPosition, objectHeight, targetH]);
};
