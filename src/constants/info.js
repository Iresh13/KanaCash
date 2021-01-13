import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '~/components/theme/Style';

export const CONTACT_NUMBER = '1-800-498-0623';
export const PHONE_NUMBER = '+1 8004980623';
export const EMAIL = 'customer_service@kanacash.com';
export const LICENCE = 'Golden Money Transfer (GMT)';
export const LICENCE_SHORT = 'GMT';
export const APP_NAME = 'KanaCash';

export const AUTHORIZATION = () => {
  return (
    <View style={styles.termContainer}>
      <Text style={styles.descriptionText}>
        I authorize <Text style={styles.boldText}>{LICENCE}</Text> via{' '}
        {APP_NAME} which is a Marketing Affiliate of{' '}
        <Text style={styles.boldText}>{LICENCE_SHORT}</Text> to debit the bank
        account indicated in this web form for the noted amount on toady's date.
        The funds for your money transfer will be debited from your bank account
        by <Text style={styles.boldText}>{LICENCE_SHORT}</Text> via Tabapay and{' '}
        <Text style={styles.boldText}>{LICENCE_SHORT}</Text> is solely
        responsible for processing your international remittance. I understand
        that because this an electronic transaction, theses funds may be
        withdrawn from my account as soon as the noted transaction date on the
        invoice. I will not dispute{' '}
        <Text style={styles.boldText}>{LICENCE_SHORT}</Text> debiting my
        checking/saving account, so long as the transaction corresponds to the
        terms indicated in this web form.
      </Text>
      <Text />
      <Text style={styles.descriptionText}>
        Click <Text style={styles.boldText}>Yes</Text> to continue or click{' '}
        <Text style={styles.boldText}>Back</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  termContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  descriptionText: {
    fontFamily: theme.themeFontRegular,
    fontSize: theme.fontSizeRegular,
    lineHeight: 25,
    color: '#5C5C5C',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: '700',
    color: '#1f1f1f',
  },
});
