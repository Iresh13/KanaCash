import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  // Alert,
  Platform,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  // DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import theme from '~/components/theme/Style';
import SInfo from 'react-native-sensitive-info';
import {MediumText, RegularText, SemiBoldText} from '~/components/ui/Text';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {resetAuth} from '~/store/actions/AuthAction';
import {CommonActions} from '@react-navigation/native';
import * as api from '~/services/axios/Api';

import {
  LogoutIcon,
  Card,
  Dashboard,
  Beneficiary,
  TierIcon,
  CloseIcon,
  TransactionIcon,
  PersonIcon,
} from '~/components/ui/Icon';

//
import {
  // DashboardScreen,
  PaymentMethodScreen,
  // PersonalInformationScreen,
  // BeneficiaryScreen,
  // TransactionScreen,
  TierScreen,
} from '~/screens/';
import {
  // NAVIGATION_TO_DASHBOARD_SCREEN,
  NAVIGATION_TO_DASHBOARD_STACK,
  NAVIGATION_TO_PAYMENT_METHOD_SCREEN,
  NAVIGATION_TO_BENEFICIARY_SCREEN,
  NAVIGATION_TO_TRANSACTIONS_SCREEN,
  NAVIGATION_TO_TIER_SCREEN,
  NAVIGATION_TO_CALCULATOR_SCREEN,
  // NAVIGATION_TO_PERSONAL_INFORMATION_SCREEN,
  NAVIGATION_TO_PERSONAL_INFO_STACK,
} from '../routes';
import DashboardStack from './DashboardStack';
import TransactionStack from './TransactionStack';
import BeneficiaryStack from './BeneficiaryStack';
import PersonalInfoStack from './PersonalInfoStack';
import config from '../../constants/config';
import {showLoader, hideLoader} from '~/store/actions/LoaderAction';
import {setError} from '~/store/actions/Error';

const drawerList = [
  {
    name: 'Dashboard',
    route: NAVIGATION_TO_DASHBOARD_STACK,
  },
  {
    name: 'Personal Information',
    route: NAVIGATION_TO_PERSONAL_INFO_STACK,
  },
  {
    name: 'Banks & Cards',
    route: NAVIGATION_TO_PAYMENT_METHOD_SCREEN,
  },
  {
    name: 'Beneficiary',
    route: NAVIGATION_TO_BENEFICIARY_SCREEN,
  },
  {
    name: 'Transaction',
    route: NAVIGATION_TO_TRANSACTIONS_SCREEN,
  },
  {name: 'Tier', icon: <TierIcon />, route: NAVIGATION_TO_TIER_SCREEN},
];

function DrawerStackScreen({navigation}) {
  const dispatch = useDispatch();
  const Drawer = createDrawerNavigator();
  const userData = useSelector(state => state.auth);
  const [focus, setFocus] = React.useState(NAVIGATION_TO_DASHBOARD_STACK);

  const CustomDrawerContent = props => {
    const clearToken = async () => {
      return SInfo.deleteItem(config.accessToken, {
        sharedPreferencesName: config.sharedPreferencesName,
        keychainService: config.keychainService,
      });
    };

    const onPressLogout = async () => {
      dispatch(showLoader());
      api
        .logout()
        .then(async res => {
          dispatch(hideLoader());
          await clearToken();
          AsyncStorage.clear();
          dispatch(resetAuth());
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              key: null,
              routes: [{name: NAVIGATION_TO_CALCULATOR_SCREEN}],
            }),
          );
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          dispatch(hideLoader());
          let modalConfig = {
            message: 'Failed to logout at the moment',
            message_title: 'Sorry!',
          };
          dispatch(setError(modalConfig));
        });
    };

    const renderIcon = status => {
      let dashboardIcon = '';
      let focusColor = focus === status ? theme.red : theme.grey;
      switch (status) {
        case NAVIGATION_TO_DASHBOARD_STACK:
          dashboardIcon = <Dashboard color={focusColor} />;
          break;
        case NAVIGATION_TO_PERSONAL_INFO_STACK:
          dashboardIcon = <PersonIcon color={focusColor} />;
          break;
        case NAVIGATION_TO_PAYMENT_METHOD_SCREEN:
          dashboardIcon = <Card color={focusColor} />;
          break;
        case NAVIGATION_TO_BENEFICIARY_SCREEN:
          dashboardIcon = <Beneficiary color={focusColor} />;
          break;
        case NAVIGATION_TO_TRANSACTIONS_SCREEN:
          dashboardIcon = <TransactionIcon color={focusColor} />;
          break;
        case NAVIGATION_TO_TIER_SCREEN:
          dashboardIcon = <TierIcon color={focusColor} />;
          break;
        default:
          dashboardIcon = null;
      }
      return dashboardIcon;
    };

    return (
      <DrawerContentScrollView>
        <View style={styles.drawerContentStyle}>
          <MediumText text="Welcome," style={styles.primaryText} />
          <SemiBoldText
            text={userData?.user?.fullName}
            style={styles.primaryText}
          />

          <View style={styles.closeIcon}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
        </View>
        {drawerList.map(item => {
          return (
            <DrawerItem
              label={() => (
                <RegularText
                  text={item.name}
                  style={[styles.mediumText(focus === item.route)]}
                />
              )}
              icon={({focused, color, size}) => renderIcon(item.route)}
              onPress={() => {
                setFocus(item.route);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    key: null,
                    routes: [{name: item.route}],
                  }),
                );
              }}
            />
          );
        })}
        <DrawerItem
          label={({focused, color}) => (
            <RegularText text="Log out" style={[styles.mediumText(false)]} />
          )}
          icon={({focused, color, size}) => <LogoutIcon />}
          onPress={onPressLogout}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <View style={[styles.mainView]}>
      <Drawer.Navigator
        drawerStyle={{width: '77%'}}
        backBehavior="initialRoute"
        drawerContent={CustomDrawerContent}
        drawerContentOptions={{
          labelStyle: {
            fontFamily: theme.themeFontMedium,
            fontSize: 18,
          },
        }}>
        <Drawer.Screen
          name={NAVIGATION_TO_DASHBOARD_STACK}
          component={DashboardStack}
          options={{
            title: 'Dashboard',
            drawerIcon: ({focused, color, size}) => (
              <Dashboard color={focused ? theme.red : theme.grey} />
            ),
          }}
        />
        <Drawer.Screen
          name={NAVIGATION_TO_PERSONAL_INFO_STACK}
          component={PersonalInfoStack}
          options={{
            title: 'Personal Information',
            drawerIcon: ({focused, color, size}) => (
              <PersonIcon color={focused ? theme.red : theme.grey} />
            ),
          }}
        />
        <Drawer.Screen
          name={NAVIGATION_TO_PAYMENT_METHOD_SCREEN}
          component={PaymentMethodScreen}
          options={{
            title: 'Banks & Cards',
            drawerIcon: ({focused, color, size}) => (
              <Card color={focused ? theme.red : theme.grey} />
            ),
          }}
        />
        <Drawer.Screen
          name={NAVIGATION_TO_BENEFICIARY_SCREEN}
          component={BeneficiaryStack}
          options={{
            title: 'Beneficiary',
            drawerIcon: ({focused, color, size}) => (
              <Beneficiary color={focused ? theme.red : theme.grey} />
            ),
          }}
        />
        <Drawer.Screen
          name={NAVIGATION_TO_TRANSACTIONS_SCREEN}
          component={TransactionStack}
          options={{
            title: 'Transaction',
            drawerIcon: ({focused, color, size}) => (
              <TransactionIcon color={focused ? theme.red : theme.grey} />
            ),
          }}
        />
        <Drawer.Screen
          name={NAVIGATION_TO_TIER_SCREEN}
          component={TierScreen}
          options={{
            title: 'Tier',
            drawerIcon: ({focused, color, size}) => (
              <TierIcon color={focused ? theme.red : theme.grey} />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  drawerItemListLabel: {},
  drawerContentStyle: {
    backgroundColor: '#F8F9FC',
    padding: theme.themeMainPadding,
    height: 150,
    justifyContent: 'center',
    marginTop: -5,
  },
  mediumText: focused => ({
    fontSize: 18,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {fontWeight: 'bold'},
    }),
    color: focused ? theme.red : theme.grey,
  }),
  closeIcon: {
    ...StyleSheet.absoluteFillObject,
    top: '40%',
    left: '95%',
  },
  primaryText: {
    color: theme.primaryColor,
  },
});

export default DrawerStackScreen;
