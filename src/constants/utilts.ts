import { Dimensions, Platform } from 'react-native';

export const { width: SW, height: SH } = Dimensions.get('window');

export const IS_ANDROID = Platform.OS == 'android';
