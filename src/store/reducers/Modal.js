import {
  PRESENT_MODAL,
  HIDE_MODAL,
  RESET_STORE,
} from '../actions/constant/ActionTypes';

const INITIAL_STATE = {
  presentModal: false,
  modalTitle: 'NA',
  modalMessage: 'NA',
  cancelButtonText: 'Cancel',
  okButtonText: 'OK',
  presentCancelBtn: false,
  presentOkBtn: true,
  okBtnNavigate: false,
  okBtnNavigateScreen: 'NA',
  handler: '',
  isFunctionHandler: false,
  navigation: '',
};

const ModalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRESENT_MODAL:
      return {
        ...state,
        presentModal: true,
        modalTitle: action.payload.message_title
          ? action.payload.message_title
          : 'NA',
        modalMessage: action.payload.message ? action.payload.message : 'NA',
        presentCancelBtn: action.payload.presentCancelBtn
          ? action.payload.presentCancelBtn
          : false,
        handler: action.payload.handler ? action.payload.handler : '',
        isFunctionHandler: action.payload.isFunctionHandler
          ? action.payload.isFunctionHandler
          : false,
        okBtnNavigate: action.payload.okBtnNavigate
          ? action.payload.okBtnNavigate
          : false,
        okBtnNavigateScreen: action.payload.okBtnNavigateScreen
          ? action.payload.okBtnNavigateScreen
          : 'NA',
        navigation: action.payload.navigation ? action.payload.navigation : '',
      };

    case HIDE_MODAL:
      return {
        ...state,
        presentModal: false,
      };

    case RESET_STORE:
      return {
        ...state,
        presentModal: false,
        modalTitle: 'NA',
        modalMessage: 'NA',
        cancelButtonText: 'Cancel',
        okButtonText: 'OK',
        presentCancelBtn: false,
        presentOkBtn: true,
        okBtnNavigate: false,
        okBtnNavigateScreen: 'NA',
        handler: '',
        isFunctionHandler: false,
        navigation: '',
      };

    default:
      return state;
  }
};

export default ModalReducer;
