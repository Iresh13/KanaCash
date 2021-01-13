import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {RegularText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';
import PickerModal from '~/components/ui/PickerModal';
import FooterButton from '~/components/ui/FooterButton';
import * as api from '~/services/axios/Api';

export default function CashPickupBlock({onPressContinue, onPressBack}) {
  const [payersList, setPayersList] = useState([]);
  const [selecetedPayer, setSelecetedPayer] = useState({});

  useEffect(() => {
    api.getPayersList('ARM').then(res => setPayersList(res.data.result));
  }, []);

  const onChangePayers = payersValue => {
    const payersListFilter = payersList.find(item => item.name === payersValue);
    setSelecetedPayer(payersListFilter);
  };

  return (
    <View style={styles.container}>
      <RegularText
        text={'Where do you want the beneficiary to pick up the cash from?'}
        style={styles.headerText}
      />
      <PickerModal
        label="Cash Pickup Location"
        pickOptions={payersList}
        placeholder="Select"
        inputParentStyles={styles.inputParentStyle}
        onValueChange={onChangePayers}
        value={selecetedPayer}
      />
      <FooterButton
        onPressBack={onPressBack}
        text="Continue"
        onPress={() => onPressContinue(selecetedPayer)}
        style={styles.continueBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputParentStyle: {
    marginBottom: 20,
  },
  headerText: {
    color: theme.primaryColor,
    fontWeight: '500',
    marginBottom: 20,
  },
  continueBtn: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 18,
  },
});
