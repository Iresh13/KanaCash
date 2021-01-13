import React, {useState} from 'react';
import {FlatList, Alert} from 'react-native';
import Header from '~/components/ui/Header';
import GenericView from '~/components/ui/GenericView';
import Block from '~/components/ui/Block';
import {Plus} from '~/components/ui/Icon';
import PaymentMethodCard from '~/components/ui/PaymentMethodCard';
import theme from '~/components/theme/Style';
import widgetType from '~/constants/widgetType';
import * as api from '~/services/axios/Api';
import {useFocusEffect} from '@react-navigation/native';
import {NAVIGTION_TO_WIDGETS_SCREEN} from '../../navigation/routes';

const BANK = 'bank';
const CARD = 'debit card';

export default function PaymentMethod({navigation, route}) {
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [cards, setCards] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const bankApi = api.getBanks();
      const cardApi = api.getCards();
      const unsubscribe = Promise.all([bankApi, cardApi]).then(values => {
        setBanks(values[0].data);
        setCards(values[1].data);
        setLoading(false);
      });
      return () => unsubscribe;
    }, []),
  );

  const onRemoveBank = bankId => {
    setLoading(true);
    api
      .removeBank(bankId)
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          const filterBanks = banks.result.filter(item => item.id !== bankId);
          setBanks({...banks, result: filterBanks});
          setTimeout(() => {
            Alert.alert('Successfully Remove');
          }, 1000);
        }
      })
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        setLoading(false);
        const message = err?.data?.message
          ? JSON.parse(err.data.message)?.message
          : 'Error while removing bank';
        setTimeout(() => {
          Alert.alert(message);
        }, 1000);
      });
  };

  const onRemoveCard = cardId => {
    setLoading(true);
    api
      .removeCard(cardId)
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          const filterCards = cards.result.filter(item => item.id !== cardId);
          setCards({...cards, result: filterCards});
          setTimeout(() => {
            Alert.alert('Successfully Remove');
          }, 1000);
        }
      })
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        const message = err?.data?.message
          ? JSON.parse(err.data.message)?.message
          : 'Error while removing debit card';
        setLoading(false);
        setTimeout(() => {
          Alert.alert(message);
        }, 1000);
      });
  };

  const askUserBeforeDelete = (type, item) => {
    const name = type === BANK ? item.accountHolderName : item.nickName;
    Alert.alert(
      'Are you sure?',
      `Delete ${name} ${type}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            type === BANK ? onRemoveBank(item.id) : onRemoveCard(item.id),
        },
      ],
      {cancelable: false},
    );
  };

  const renderBanks = ({item, index}) => {
    return (
      <PaymentMethodCard
        cardType="bank"
        num={index + 1}
        title={item.name}
        first={item.accountHolderName}
        second={item.accountType}
        onPressRemove={() => askUserBeforeDelete(BANK, item)}
      />
    );
  };

  const renderCards = ({item, index}) => {
    return (
      <PaymentMethodCard
        cardType="debt"
        num={index + 1}
        title={item.fundingSourceName}
        first={item.nickName}
        second={item.institutionName}
        onPressRemove={() => askUserBeforeDelete(CARD, item)}
      />
    );
  };

  return (
    <GenericView
      loading={loading}
      header={
        <Header
          title={'Payment Method'}
          // backButtonVisible={route.params?.routeFrom}
        />
      }
      padding
      scrollable>
      <Block
        onPress={() =>
          navigation.navigate(NAVIGTION_TO_WIDGETS_SCREEN, {
            widgetType: widgetType.bank,
          })
        }
        title="Add bank"
        rightContent={<Plus />}
        primary
      />
      <FlatList
        data={banks.result}
        renderItem={renderBanks}
        keyExtractor={item => item.id}
      />

      <Block
        onPress={() =>
          navigation.navigate(NAVIGTION_TO_WIDGETS_SCREEN, {
            widgetType: widgetType.card,
          })
        }
        title="Add Debit Card"
        rightContent={<Plus />}
        backgroundColor={theme.red}
      />
      <FlatList
        data={cards.result}
        renderItem={renderCards}
        keyExtractor={item => item.id}
      />
    </GenericView>
  );
}
