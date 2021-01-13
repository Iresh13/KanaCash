import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Linking, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {RegularText} from '~/components/ui/Text';
import * as api from '~/services/axios/Api';
import {layoutAnimation} from '~/presentation';

// const WEB_LINK = 'https://www.dbo.ca.gov/licensees/money_transmitters/';
// const MAIL = 'consumer.services@dbo.ca.gov';

export default function Information() {
  const userData = useSelector(state => state.auth);
  const [license, setLicense] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const stateCode = userData.user.address.stateCode;
    api.getLicense(stateCode).then(res => {
      setLicense(res.data);
      setLoading(false);
      layoutAnimation();
    });
  }, [userData.user.address.stateCode]);

  const onPressLink = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(license.website);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(license.website);
    } else {
      Alert.alert(`Don't know how to open this URL: ${license.website}`);
    }
  }, [license.website]);

  const onPressMail = () => {
    Linking.openURL(`mailto:${license.email}`);
  };

  return (
    !loading && (
      <View style={styles.container}>
        <RegularText
          style={styles.textStyle}
          text={
            'If you have any complaint to any aspect of money transmission activities conducted through this service, you may contact:'
          }
        />
        <View style={styles.separator} />
        <View style={styles.separator} />
        <RegularText
          style={[styles.textStyle, styles.bold]}
          text={license.regulatoryName}
        />
        <RegularText
          style={[styles.textStyle, styles.bold]}
          text={license.address}
        />
        <View style={styles.separator} />
        <View style={styles.center}>
          <RegularText text={'Telephone:'} />
          <Text style={styles.bold}>{license.telephone}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.center}>
          <RegularText text={'Website:'} />
          <Text style={[styles.bold, styles.colorText]} onPress={onPressLink}>
            {license.website}
          </Text>
        </View>
        <View style={styles.separator} />
        {license.email && (
          <View style={styles.center}>
            <RegularText text={'Email:'} />
            <Text style={[styles.bold, styles.colorText]} onPress={onPressMail}>
              {license.email}
            </Text>
          </View>
        )}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  separator: {
    marginBottom: 10,
  },
  textStyle: {
    textAlign: 'center',
  },
  bold: {fontWeight: 'bold', textAlign: 'center'},
  center: {alignItems: 'center'},
  colorText: {
    color: '#027DFF',
    fontSize: 15,
  },
});
