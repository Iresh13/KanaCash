import React from 'react';
import {
  StyleSheet,
  View,
  Linking,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {RegularText} from '~/components/ui/Text';
import * as Preset from '~/components/ui/Preset';
import theme from '~/components/theme/Style';
import {CONTACT_NUMBER} from '../../../constants/info';

export default function Footer() {
  const onPressContact = () => {
    Linking.openURL(`tel:${CONTACT_NUMBER}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressContact}>
        <RegularText
          text="Need help? We're here for you"
          style={Preset.textCenter}
        />
        <RegularText
          text="Contact Customer support"
          style={[Preset.textCenter, styles.footerText]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  footerText: {
    color: theme.red,
    marginTop: 5,
    fontWeight: 'bold',
  },
});
