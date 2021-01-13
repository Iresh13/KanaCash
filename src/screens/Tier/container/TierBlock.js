import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import ExpandableBlock from '~/components/ui/ExpandableBlock';
import {SemiBoldText} from '~/components/ui/Text';
import {TierIcon} from '~/components/ui/Icon';
import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from './Level3';

export default function TierBlock({
  active,
  onPress,
  level,
  onPressUpgradeTier,
  tier,
  currentTier,
}) {
  const showLevel1Upgrade = () => {
    return currentTier === 'LEVEL1' ||
      currentTier === 'LEVEL2' ||
      currentTier === 'LEVEL3'
      ? false
      : true;
  };
  const showLevel2Upgrade = () => {
    return currentTier === 'LEVEL2' || currentTier === 'LEVEL3' ? false : true;
  };
  const showLevel3Upgrade = () => {
    return currentTier === 'LEVEL3' ? false : true;
  };

  const renderTierLevel = tierLevel => {
    let component;
    let color;
    switch (tierLevel) {
      case 'LEVEL1':
        component = <Level1 showUpgrageTier={showLevel1Upgrade()} />;
        color = '#027DFF';
        break;
      case 'LEVEL2':
        component = <Level2 showUpgrageTier={showLevel2Upgrade()} />;
        color = '#219653';
        break;
      case 'LEVEL3':
        component = <Level3 showUpgrageTier={showLevel3Upgrade()} />;
        color = '#B31F31';
        break;
      default:
        component = null;
        color = '#027DFF';
        break;
    }
    return {component, color};
  };

  return (
    <ExpandableBlock
      onPress={onPress}
      style={styles.blockStyle}
      containerStyle={styles.blockContainer}
      leftContent={<TierIcon color={renderTierLevel(tier).color} />}
      title={level}
      content={active && renderTierLevel(tier).component}
    />
  );
}

const styles = StyleSheet.create({
  blockStyle: {borderColor: '#B6C0C9', marginTop: 2},
  infoText: {fontSize: 18, fontWeight: '400', lineHeight: 23},
  contentTitle: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 23,
    marginTop: 15,
  },
  blockContent: {},
});
