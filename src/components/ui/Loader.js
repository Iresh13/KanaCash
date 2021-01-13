import React from 'react';
import {View, ActivityIndicator, Modal, StyleSheet} from 'react-native';

import {RegularText} from '~/components/ui/Text';

import {useSelector} from 'react-redux';

const Loader = () => {
  const loaderState = useSelector(state => state.loader);
  return (
    <Modal
      statusBarTranslucent={true}
      animationType="fade"
      transparent={true}
      visible={loaderState.presentLoader}>
      <View style={styles.loaderView}>
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#fff" />
          <RegularText text="Please wait..." style={styles.loaderText} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.44)',
  },
  loaderStyle: {
    width: '60%',
    height: '20%',
    backgroundColor: '#2e333b',
    elevation: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
  },
});
