import React, {useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {RegularText, MediumText} from '~/components/ui/Text';
import {layoutAnimation} from '~/presentation';
import ExpandableBlock from '~/components/ui/ExpandableBlock';
import {Outline, Done} from '~/components/ui/Icon';
import AddNewBank from './AddNewBank';
import {CloseIcon} from '~/components/ui/Icon';
import Button from './Button';
import theme from '~/components/theme/Style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import receiveMethod, {
  CASH_PICKUP,
  BANK_DEPOSIT,
  HOME_DELIVERY,
  WALLET,
  walletConfig,
} from '~/constants/receiveMethod';
import * as api from '~/services/axios/Api';
import checkAvailablePayoutMethod from '~/utils/checkAvailablePayoutMethod';
import AddWallet from './WalletBlock';

export default function PayoutModal({
  onRequestClose,
  modalVisible,
  id,
  onSuccessAddBeneficiaryBank,
  onPressBack,
  data,
}) {
  const [selectedBlock, setSelectedBlock] = useState(undefined);
  // const [selectedBeneficiaryBank, setSelectedBeneficiaryBank] = useState('');
  const [availablePayoutMethod, setAvailablePayoutMethod] = useState([]);

  // to show and hide block
  const onSelectBlock = value => {
    if (value === CASH_PICKUP) {
      // setSelectedBeneficiaryBank('');
    }
    layoutAnimation();
    setSelectedBlock(value);
  };

  React.useEffect(() => {
    api.getDestinationCountries('US').then(res => {
      const getAvailablePayoutMethod = res.data.result.find(item => {
        return item.threeCharCode === data.address.country;
      });
      setAvailablePayoutMethod(getAvailablePayoutMethod);
      layoutAnimation();
    });
  }, [data.address.country]);

  const renderBlock = blockType => {
    var block = null;
    switch (blockType) {
      case CASH_PICKUP:
        block = (
          <View style={styles.cashPickUpStyle}>
            <RegularText
              style={styles.cashPickUpTextStyle}
              text="Cash pickup is already enabled. Please continue."
            />
            <Button
              onPressBack={onPressBack}
              text="Continue"
              style={styles.btnStyle}
              buttonWidth={345}
              onPress={onPressBack}
            />
          </View>
        );
        break;
      case BANK_DEPOSIT:
        block = (
          <AddNewBank
            countryCode={data.address.country}
            beneficiaryId={id}
            onPressBack={onPressBack}
            onSuccessAddBeneficiaryBank={onSuccessAddBeneficiaryBank}
          />
        );
        break;
      case WALLET:
        block = (
          <AddWallet
            beneficiaryId={id}
            onPressContinue={onSuccessAddBeneficiaryBank}
          />
        );
        break;
      default:
        block = null;
        break;
    }
    return block;
  };

  const renderReceiveMethod = ({item}) => {
    return selectedBlock === undefined ? (
      checkAvailablePayoutMethod(
        availablePayoutMethod.payoutMethod,
        item.value,
      ) ? (
        <ExpandableBlock
          onPress={() => onSelectBlock(item.payoutMethod)}
          containerStyle={styles.blockContainer}
          leftContent={item.icon}
          title={item.title}
          caption={item.caption}
          rightContent={<Outline />}
        />
      ) : null
    ) : item.payoutMethod === selectedBlock ? (
      <ExpandableBlock
        onPress={() => onSelectBlock(undefined)}
        containerStyle={styles.blockContainer}
        leftContent={item.icon}
        title={item.title}
        caption={item.caption}
        rightContent={<Done size={30} />}
        content={renderBlock(item.payoutMethod)}
      />
    ) : null;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.keyboardViewContainer}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.topContent}>
              <MediumText
                text="Please Select Receive Method"
                style={[styles.primaryText]}
              />
              <TouchableOpacity onPress={onRequestClose}>
                <CloseIcon size={40} color={'#B31F31'} />
              </TouchableOpacity>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={availablePayoutMethod.length === 0 ? [] : receiveMethod}
              renderItem={renderReceiveMethod}
              keyExtractor={item => item.title}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
}

// const receiveMethod = [
//   // {
//   //   id: 1,
//   //   icon: <Cash />,
//   //   payoutMethod: CASH_PICKUP,
//   //   title: 'Cash Pickup',
//   //   caption: 'Pick up money from cash pick up locations',
//   //   component: '',
//   // },
//   {
//     id: 2,
//     payoutMethod: BANK_DEPOSIT,
//     icon: <BankDeposit />,
//     title: 'Bank Deposit',
//     caption: "Transfer money to beneficiary's bank account",
//   },
// ];

const styles = StyleSheet.create({
  keyboardViewContainer: {flex: 1},
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centeredView: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  primaryText: {
    color: theme.red,
    marginVertical: 15,
  },
  optionContainer: {
    marginTop: 30,
  },
  cashPickUpStyle: {
    marginVertical: 15,
  },
  cashPickUpTextStyle: {
    marginVertical: 15,
    color: theme.primaryColor,
  },
});
