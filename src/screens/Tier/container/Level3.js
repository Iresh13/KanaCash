import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SemiBoldText} from '~/components/ui/Text';
import Bullet from './Bullet';
import UpgradeButton from './UpgradeButton';

const requirementText = [
  {label: 'Occupation'},
  {label: 'Company Details'},
  {label: 'Source of Funds:'},
  {label: '1. Bank Statement 2. Pay Slip'},
];

const notes = [
  {label: 'upto $2,000 per transaction'},
  {label: 'upto $3,000 per day'},
  {label: 'upto $6,000 per 15 days'},
  {label: 'upto $10,000 per 30 days'},
  {label: 'upto $30,000 per 6 months'},
];

export default function Level1({showUpgrageTier}) {
  return (
    <View style={styles.blockContent}>
      <SemiBoldText style={styles.contentTitle} text="Requirement" />
      {requirementText.map(item => (
        <Bullet text={item.label} />
      ))}
      <SemiBoldText
        style={styles.contentTitle}
        text="Note: Limit for Level 3 customers"
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
