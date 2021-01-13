import React, {Component} from 'react';
import {View, StyleSheet, Modal, TouchableOpacity} from 'react-native';

import Button from '~/components/ui/Button';
import {SemiBoldText, RegularText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';

import {connect} from 'react-redux';
import {hideModal} from '~/store/actions/Modal';
import {hideLoader} from '~/store/actions/LoaderAction';

class AlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  cancelBtnHandler = () => {
    this.props.dispatch(hideModal());
  };

  okBtnHandler = () => {
    const shouldNavigate = this.props.state.okBtnNavigate;
    const screen = this.props.state.okBtnNavigateScreen;

    const navigation = this.props.state.navigation;

    const functionHandler = this.props.state.isFunctionHandler;

    if (shouldNavigate) {
      this.props.dispatch(hideModal());
      this.props.dispatch(hideLoader());

      navigation.navigate(screen);
    } else if (functionHandler) {
      this.props.dispatch(hideModal());
      // execute function
    } else {
      this.props.dispatch(hideModal());
    }
  };

  render() {
    return (
      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        transparent={true}
        visible={this.props.state.presentModal}>
        <View style={styles.mainView}>
          <View style={alertStyle(this.props.width, this.props.height)}>
            <View style={styles.alertPartitionStyle}>
              {this.props.state.modalTitle !== 'NA' && (
                <View style={styles.alertHeader}>
                  <SemiBoldText
                    text={this.props.state.modalTitle}
                    style={styles.alertHeaderText}
                  />
                </View>
              )}

              {this.props.state.modalMessage !== 'NA' && (
                <View style={styles.alertMessage}>
                  <RegularText
                    text={this.props.state.modalMessage}
                    style={styles.alertMessageText}
                  />
                </View>
              )}

              <View style={styles.buttonView}>
                {this.props.state.presentCancelBtn ? (
                  <View style={styles.singleBtnView}>
                    <Button
                      onPress={this.cancelBtnHandler}
                      text="Cancel"
                      buttonInvert={true}
                      smallButton={true}
                      buttonWidth={120}
                      style={styles.btnTextStyle}
                    />
                  </View>
                ) : null}
                {this.props.state.presentOkBtn ? (
                  <TouchableOpacity
                    onPress={this.okBtnHandler}
                    style={styles.singleBtnView}>
                    <SemiBoldText text="Ok" invert />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

function alertStyle(width = '80%', height = '24%') {
  return {
    width: width,
    // height: height,
    backgroundColor: '#2e333b',
    elevation: 20,
    borderRadius: 15,
    padding: 20,
  };
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.44)',
  },
  alertStyle: {
    width: '81%',
    height: '24%',
    backgroundColor: '#2e333b',
    elevation: 20,
    borderRadius: 15,
  },
  alertPartitionStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 20,
  },
  alertHeaderText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  alertMessage: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  alertMessageText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  buttonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 5,
    paddingRight: 5,
  },
  singleBtnView: {
    borderWidth: 1,
    width: 120,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.red,
    borderColor: theme.red,
    borderRadius: 120,
  },
  btnTextStyle: {
    fontSize: 16,
    borderRadius: 50,
  },
});

const mapStateToProps = state => {
  return {
    state: state.modal,
    checkInOut: state.checkInOut,
  };
};

export default connect(mapStateToProps)(AlertModal);
