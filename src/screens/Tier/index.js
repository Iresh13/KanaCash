import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import GenericView from '~/components/ui/GenericView';
import Header from '~/components/ui/Header';
import {RegularText} from '~/components/ui/Text';
import widgetType from '~/constants/widgetType';
import {getCurrentUser} from '~/store/actions/UserDetailsAction';
import {NAVIGTION_TO_WIDGETS_SCREEN} from '../../navigation/routes';
import {layoutAnimation} from '~/presentation';

import {TierBlock} from './container';

const TIER_LIST = [
  {tier: 'LEVEL1', title: 'Level 1'},
  {tier: 'LEVEL2', title: 'Level 2'},
  {tier: 'LEVEL3', title: 'Level 3'},
];

export default function Tier({navigation}) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth);
  const [activeTier, setActiveTier] = React.useState('LEVEL1');

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = dispatch(getCurrentUser());
      return () => unsubscribe;
    }, []),
  );

  const onPressBlock = tier => {
    setActiveTier(tier);
    layoutAnimation();
  };

  const renderTier = ({item}) => {
    const currentTier =
      item.tier === userData?.status.currentTier ? '(Current Limit)' : '';
    return (
      <TierBlock
        tier={item.tier}
        currentTier={userData?.status.currentTier}
        level={`${item.title} ${currentTier}`}
        onPress={() => onPressBlock(item.tier)}
        active={activeTier === item.tier}
      />
    );
  };

  return (
    <GenericView header={<Header title="Upgrade Tier" />}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponentStyle={styles.cardStyle}
        ListHeaderComponent={
          <RegularText
            style={styles.infoText}
            text="All customers are categorized under three (3) transaction limits based on the amount they can send. if you want to transfer more funds your current transactions limit allows, then you will need to a higher transaction limit. To upgrade, you will be required to provide additional information."
          />
        }
        data={TIER_LIST}
        renderItem={renderTier}
        keyExtractor={item => item.tier}
      />
    </GenericView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {padding: 15},
  cardStyle: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 10,
  },
});
