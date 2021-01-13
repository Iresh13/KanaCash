import React from 'react';
import {StyleSheet, View} from 'react-native';
import Block from '~/components/ui/Block';
import {RegularText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';
import {
  File,
  BankCard,
  CallReceived,
  MoreVert,
  Done,
} from '~/components/ui/Icon';
import {useNavigation} from '@react-navigation/native';
import {
  NAVIGATION_TO_BENEFICIARY_SCREEN,
  NAVIGATION_TO_PAYMENT_METHOD_SCREEN,
  NAVIGTION_TO_WIDGETS_SCREEN,
} from '../../../navigation/routes';
import widgetType from '~/constants/widgetType';

export default function InCompleteProfile({onPressCompleteProfile, data}) {
  const navigation = useNavigation();
  return (
    <View style={styles.contentWrapper}>
      <RegularText text="Action items for you" style={styles.titleStyle} />
      <Block
        onPress={() =>
          navigation.navigate(NAVIGTION_TO_WIDGETS_SCREEN, {
            widgetType: widgetType.kyc,
          })
        }
        leftContent={<File />}
        title="Complete your profile"
        caption="verify your KYC"
        rightContent={
          data?.status.isKYCVerified ? <Done size={30} /> : <MoreVert />
        }
      />
      <Block
        onPress={() =>
          navigation.navigate(NAVIGATION_TO_PAYMENT_METHOD_SCREEN, {
            routeFrom: 'DashboardStack',
          })
        }
        leftContent={<BankCard />}
        title="Add Card or Connect bank"
        caption="Link your debit Card or bank account"
        rightContent={
          data?.profileCompleteStatus.cardComplete ? (
            <Done size={30} />
          ) : (
            <MoreVert />
          )
        }
      />
      <Block
        onPress={() => navigation.navigate(NAVIGATION_TO_BENEFICIARY_SCREEN)}
        leftContent={<CallReceived />}
        title="Receiver / Beneficiary"
        caption="Who are you sending money to"
        rightContent={
          data?.profileCompleteStatus.baneficiaryComplete ? (
            <Done size={30} />
          ) : (
            <MoreVert />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  scrollView: {
    padding: 20,
  },
  contentWrapper: {
    marginTop: 20,
  },
  titleStyle: {
    fontWeight: '600',
    marginBottom: 5,
    color: theme.fontDark,
  },
});
