import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {RegularText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';
import PickerModal from '~/components/ui/PickerModal';
import FooterButton from '~/components/ui/FooterButton';
import * as api from '~/services/axios/Api';
import {showLoader, hideLoader} from '~/store/actions/LoaderAction';

export default function CashPickupBlock({onPressContinue, onPressBack}) {
  const dispatch = useDispatch();
  const [payersList, setPayersList] = useState([]);

  useEffect(() => {
    dispatch(showLoader());
    api
      .getHomeDeliveryStateApi('ARM')
      .then(res => {
        setPayersList(res.data.result[0]);
        dispatch(hideLoader());
      })
      .catch(err => {
        dispatch(hideLoader());
      });
  }, []);

  return (
    <View style={styles.container}>
      <FooterButton
        onPressBack={onPressBack}
        text="Continue"
        onPress={() => onPressContinue(payersList)}
        style={styles.continueBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  continueBtn: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 18,
  },
});
