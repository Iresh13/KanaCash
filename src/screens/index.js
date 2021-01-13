import CalculatorScreen from './Calculator';
import AuthOptionScreen from './AuthOption';
/***
 * Authentication Stack navigation
 */
import EmailVerificationCodeScreen from './EmailVerificationCode';
import EmailVerificationScreen from './EmailVerification';
import EmailVerifiedScreen from './EmailVerified';
import ForgotPasswordScreen from './ForgotPassword';
import GetStartedScreen from './GetStarted';
import LoginScreen from './Login';
import PhoneVerificationCodeScreen from './PhoneVerificationCode';
import PhoneVerifiedScreen from './PhoneVerified';
import UserInformationScreen from './UserInformation';
import UserVerifiedScreen from './UserVerified';
import DeviceVerificationCodeScreen from './DeviceVerificationCode';

/***
 * Dashboard Stack navigator
 */
import DashboardScreen from './Dashboard';
import SendMoneyScreen from './SendMoney';

// kyc
import WidgetScreen from './Widget';

/***
 * Transaction Stack navigator
 */
import TransactionScreen from './Transaction';
import TransactionDetailScreen from './TransactionDetail';

/***
 * Payment Stack navigator
 */
import PaymentMethodScreen from './PaymentMethod';

/***
 * Beneficiary Stack navigator
 */
import BeneficiaryScreen from './Beneficiary';
import CreateBeneficiaryScreen from './CreateBeneficiary';
import AddBeneficiaryDetailsScreen from './AddBeneficiaryDetails';
import BeneficiarySuccessScreen from './BeneficiarySuccess';
import AddReceiveMethodScreen from './AddReceiveMethod';
/**
 * Payout Method
 */
import PayoutMethodScreen from './PayoutMethod';

/**
 * Tier
 */
import TierScreen from './Tier';

/**
 * Personal Information
 */
import PersonalInformationScreen from './PersonalInformation';

// sendmoney flow
import TransactionConfirmationScreen from './TransactionConfirmation';
import TransactionSuccessScreen from './TransactionSuccess';

//

export {
  //
  CalculatorScreen,
  AuthOptionScreen,
  // authentication stack|route navigation
  EmailVerificationCodeScreen,
  EmailVerificationScreen,
  EmailVerifiedScreen,
  ForgotPasswordScreen,
  GetStartedScreen,
  LoginScreen,
  PhoneVerificationCodeScreen,
  PhoneVerifiedScreen,
  UserInformationScreen,
  UserVerifiedScreen,
  DeviceVerificationCodeScreen,
  // dashboard stack navigation
  DashboardScreen,
  SendMoneyScreen,
  WidgetScreen,
  // Transaction
  TransactionScreen,
  TransactionDetailScreen,
  // paymet method
  PaymentMethodScreen,
  // beneficiary
  CreateBeneficiaryScreen,
  BeneficiaryScreen,
  AddBeneficiaryDetailsScreen,
  BeneficiarySuccessScreen,
  AddReceiveMethodScreen,
  // payout method
  PayoutMethodScreen,
  // Tier
  TierScreen,
  // personal Information
  PersonalInformationScreen,
  // transaction
  TransactionConfirmationScreen,
  TransactionSuccessScreen,
};
