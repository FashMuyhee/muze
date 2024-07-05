import {View} from 'react-native';
import {FlexViewProps} from './type';

export const CenterView: React.FC<FlexViewProps> = ({children, justify = 'center', align = 'center', ...props}) => {
  return <View style={[{justifyContent: justify, alignItems: align, flexDirection: 'column'}, props.style]}>{children}</View>;
};
