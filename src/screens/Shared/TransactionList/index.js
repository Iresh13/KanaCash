import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
// import GenericView from '~/components/ui/GenericView';
import {
  SemiBoldText,
  BoldText,
  LightText,
  MediumText,
} from '~/components/ui/Text';
// import Header from '~/components/ui/Header';
import {Number} from '~/components/ui/Icon';
import theme from '~/components/theme/Style';
import TransactionBlock from '~/components/ui/TransactionBlock';
import * as api from '~/services/axios/Api';
import {createTransactionData} from '~/store/actions/TransactionAction';
import {NAVIGATION_TO_TRANSACTION_DETAILS_SCREEN} from '../../../navigation/routes';
import abbreviateNumber from '~/utils/abbreviateNumber';
import checkTransactionStatus, {
  statusStyle,
} from '~/utils/checkTransactionStatus';

export default function TransactionList({renderTotal, ...attributes}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  const [transactionList, setTransactionList] = useState([]);
  const [error, setError] = useState(undefined);
  // const [glance, setGlance] = useState({amountSent: 0});
  const [transactionLimit, setTransactionLimit] = useState(undefined);
  // pagination
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setError(undefined);
      let unsubscribe = () => {};
      if (renderTotal) {
        setPageLoading(true);
        unsubscribe = () => {
          // api.getGlance().then(res => {
          //   setGlance(res.data);
          // });
          api.transactionLimit().then(res => setTransactionLimit(res.data));
        };
      }
      unsubscribe();
      return () => unsubscribe;
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      setError(undefined);
      let unsubscribe = () => {};
      if (nextPage) {
        setPageLoading(true);
        unsubscribe = () => {
          const params = {
            page: page,
            pageSize: 20,
          };
          api
            .getTransaction(params)
            .then(res => {
              if (res.data.result.length === 0) {
                console.log('res.data.', res.data);
                setNextPage(false);
              }
              console.log('res', res.data.result);
              setTransactionList(prevState => [
                ...prevState,
                ...res.data.result,
              ]);
              setPageLoading(false);
            })
            .catch(err => {
              setTransactionList({result: []});
              setError(err.data.error);
              setPageLoading(false);
            });
        };
      }
      unsubscribe();
      return () => unsubscribe;
    }, [page]),
  );

  const onEndReached = () => {
    !pageLoading && nextPage && setPage(prevCount => prevCount + 1);
  };

  const onPressBlock = item => {
    dispatch(createTransactionData(item));
    navigation.navigate(NAVIGATION_TO_TRANSACTION_DETAILS_SCREEN);
  };

  const renderTransaction = ({item, index}) => {
    return (
      <TransactionBlock
        onPress={() => onPressBlock(item)}
        leftContent={<Number num={index + 1} invert />}
        rightContent={
          <View style={styles.blockRightContentStyle}>
            <MediumText text={`$${abbreviateNumber(item.senderAmount)}`} />
            <LightText text={item.createdAt} numberOfLines={1} />
          </View>
        }
        // statusColor={statusStyle(checkTransactionStatus(item))}
        statusColor={statusStyle(item.status)}
        // status={checkTransactionStatus(item)}
        status={item.status}
        title={item.beneficiary.fullName}
        caption={item.referenceNumber}
      />
    );
  };

  // status

  return (
    <View style={styles.container}>
      {renderTotal && (
        <View style={styles.amountWrapper}>
          <BoldText
            text={`${transactionLimit ? transactionLimit.senderLimit : 0} USD`}
            style={[styles.amountText]}
          />
          <SemiBoldText text={'Transaction Limit'} />
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={transactionList}
        renderItem={renderTransaction}
        keyExtractor={(item, index) => item.referenceId.toString() + index}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        ListFooterComponent={
          nextPage ? (
            <ActivityIndicator
              style={styles.indicator}
              animating={nextPage}
              size="small"
              color="green"
            />
          ) : (
            <></>
          )
        }
        ListEmptyComponent={
          !pageLoading ? (
            <View style={styles.listEmptyComponentStyle}>
              <Text style={styles.emptyStateText}>
                <Text style={styles.bold}>No transactions. </Text>
                <Text>
                  You currently have no transactions. Once you make a transfer,
                  it will show up here.
                </Text>
              </Text>
            </View>
          ) : (
            <></>
          )
        }
        {...attributes}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  amountWrapper: {
    marginTop: 10,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  listHeaderComponentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  footerText: {
    color: theme.red,
  },
  blockRightContentStyle: {alignItems: 'flex-end'},
  listEmptyComponentStyle: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontFamily: theme.themeFontRegular,
    fontSize: theme.fontSizeRegular,
    lineHeight: 20,
    color: theme.fontColor,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  indicator: {marginVertical: 10},
});
