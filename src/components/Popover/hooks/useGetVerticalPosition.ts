import React from 'react';
import { EXTRA_SPACING } from '../util';

type Params = {
  targetHeight: number;
  targetYPosition: number;
};

export const useGetVerticalPosition = ({ targetHeight, targetYPosition }: Params) => {
  const positions = React.useMemo(() => {
    const T_POS = targetYPosition - targetHeight + EXTRA_SPACING;
    const B_POS = targetYPosition + targetHeight + EXTRA_SPACING;
    return { T_POS, B_POS };
  }, [targetHeight, targetYPosition]);

  return positions;
};
