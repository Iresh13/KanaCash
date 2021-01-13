import {Platform, Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
const {width} = Dimensions.get('window');

const Device = {
  UniqueId: DeviceInfo.getUniqueId(),
  Platform: Platform.OS === 'ios' ? 'ios' : 'android',
  isTablet: width > 768 ? true : false,
};

export default Device;
