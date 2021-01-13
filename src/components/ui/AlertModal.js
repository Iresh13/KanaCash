import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {SemiBoldText, RegularText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';

export default function AlertModal({
  visible,
  onRequestClose,
  onPressOk,
  title,
  message,
  closeButton,
}) {
  return (
    <Modal
      statusBarTranslucent={true}
      animationType="fade"
      transparent={true}
      onRequestClose={onRequestClose}
      visible={visible}>
      <TouchableWithoutFeedback style={styles.mainView}>
        <View style={styles.mainView}>
          <View style={styles.messageWrapper}>
            <View style={styles.alertMessage}>
              {title && <SemiBoldText text={title} invert />}
              <RegularText text={message} style={styles.alertMessageText} />
            </View>

            {!closeButton ? (
              <View style={styles.rowGroup}>
                <TouchableOpacity
                  onPress={onPressOk}
                  style={styles.singleBtnView}>
                  <SemiBoldText text="Yes" invert />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onRequestClose}
                  style={styles.cancelButton}>
                  <SemiBoldText text="No" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={onPressOk}
                style={styles.singleBtnView}>
                <SemiBoldText text={closeButton} invert />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.44)',
  },
  alertMessage: {
    // paddingLeft: 20,
    // paddingRight: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageWrapper: {
    width: '80%',
    backgroundColor: '#1F1F1F',

    padding: 20,
    borderRadius: 5,
  },
  alertMessageText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  singleBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 40,
    backgroundColor: theme.red,
    borderColor: theme.red,
    borderRadius: 50,
  },
  rowGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
