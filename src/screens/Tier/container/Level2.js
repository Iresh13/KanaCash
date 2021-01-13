import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SemiBoldText} from '~/components/ui/Text';
import Bullet from './Bullet';
import UpgradeButton from './UpgradeButton';

const requirementText = [
  {label: 'Copy of Identification Document'},
  {label: 'ID Number'},
  {label: 'ID Issuing Authority'},
  {label: 'ID Expiry Date'},
  {label: 'Full SSN'},
];

const notes = [
  {label: 'upto $1,000 per transaction'},
  {label: 'upto $2,999 per day'},
  {label: 'upto $2,999 per 15 days'},
  {label: 'upto $5,000 per 30 days'},
  {label: 'upto $9,999 per 6 months'},
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
        text="Note: Limit for Level 2 customers"
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
