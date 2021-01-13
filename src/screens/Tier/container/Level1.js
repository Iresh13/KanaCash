import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SemiBoldText} from '~/components/ui/Text';
import Bullet from './Bullet';
import UpgradeButton from './UpgradeButton';

const requirementText = [
  {label: 'Full Name'},
  {label: 'Gender'},
  {label: 'Full Address (Street, City, State, Zip Code)'},
  {label: 'Date of Birth'},
  {label: 'Email Address'},
  {label: 'Phone Number'},
  {label: 'OFAC and Sanction List Checks'},
  {label: 'Sender Beneficiary Relationship'},
];

const notes = [
  {label: 'upto $500 per transaction'},
  {label: 'upto $500 per day'},
  {label: 'upto $1,000 per 15 days'},
  {label: 'upto $1,000 per 30 days'},
  {label: 'upto $3,000 per 6 months'},
];

export default function Level1({onPressUpgradeTier, showUpgrageTier}) {
  return (
    <View style={styles.blockContent}>
      <SemiBoldText style={styles.contentTitle} text="Requirement" />
      {requirementText.map(item => (
        <Bullet text={item.label} />
      ))}
      <SemiBoldText
        style={styles.contentTitle}
        text="Note: Limit for Level 1 customers"
      />
      {notes.map(item => (
        <Bullet text={item.label} />
      ))}
      {showUpgrageTier && <UpgradeButton />}
    </View>
  );
}

const styles = StyleSheet.create({
  blockContent: {},
  blockStyle: {borderColor: '#B6C0C9', marginTop: 10},
  contentTitle: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 23,
    marginTop: 15,
  },
});
