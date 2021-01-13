import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import Header from '~/components/ui/Header';
import {getCurrentUser} from '~/store/actions/UserDetailsAction';
import GenericView from '~/components/ui/GenericView';
import {CompleteProfile, TopHeader, Footer} from './container';
import {checkProfileCompleteStatus} from '../../store/actions/AuthAction';

/**
 * @author sushant suwal
 * @export
 * @param {*} {navigation}
 * @returns
 */
export default function Dashboard({navigation}) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth);
  // const {baneficiaryComplete, cardComplete} = userData.profileCompleteStatus;

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = dispatch(getCurrentUser(navigation));
      return () => unsubscribe;
    }, []),
  );

  /**
   * run if only profile setup is incomplete
   */
  useFocusEffect(
    React.useCallback(() => {
      console.log('userData.profileComplete', userData.profileComplete);
      if (!userData.profileComplete) {
        dispatch(checkProfileCompleteStatus());
      }
    }, []),
  );

  return (
    <GenericView
      header={<Header title={userData.profileComplete && 'Dashboard'} />}
      padding
      scrollable={!userData.profileComplete}
      footer={!userData.profileComplete ? <Footer /> : <></>}>
      <TopHeader data={userData} />
      <CompleteProfile />
      {/* {!userData.profileComplete ? (
        <InCompleteProfile data={userData} />
      ) : (
        <CompleteProfile />
      )} */}
    </GenericView>
  );
}
