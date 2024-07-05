import {ViewProps, ViewStyle} from 'react-native';

export interface FlexViewProps extends ViewProps {
  direction?: ViewStyle['flexDirection'];
  justify?: ViewStyle['justifyContent'];
  align?: ViewStyle['alignItems'];
}
