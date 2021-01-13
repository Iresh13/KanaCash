import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {RegularText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';
import PickerModal from '~/components/ui/PickerModal';
import * as api from '~/services/axios/Api';
import {showLoader, hideLoader} from '~/store/actions/LoaderAction';

const cityOption = [
  {leaveType: 'city 1'},
  {leaveType: 'city 2'},
  {leaveType: 'city 3'},
];

export default function HomeDeliveryBlock({item, onSelectHomeDelivery}) {
  const dispatch = useDispatch();
  const isHomeDeliveryEnabled = item.address.state === 'Yerevan';

  React.useEffect(() => {
    dispatch(showLoader());
    api
      .getHomeDeliveryStateApi('ARM')
      .then(res => {
        onSelectHomeDelivery(res.data.result[0]);
        dispatch(hideLoader());
      })
      .catch(err => dispatch(hideLoader()));
  }, []);

  return (
    <View>
      {isHomeDeliveryEnabled ? (
        <RegularText
          text={'Home delivery is already enabled. Please continue'}
          style={styles.headerText}
        />
      ) : (
        <RegularText
          text={"Home delivery is not available for this beneficiary's region"}
          style={styles.redText}
        />
      )}
      {/* <RegularText
        text={'Please Provide where the agent should deliver the payment to'}
        style={styles.headerText}
      />
      <PickerModal
        label="Please select your city"
        pickOptions={cityOption}
        placeholder="Select"
        inputParentStyles={styles.inputParentStyle}
        onValueChange={() => {}}
      /> */}
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
    paddingHorizontal: 20,
  },
  redText: {
    color: theme.red,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
});
