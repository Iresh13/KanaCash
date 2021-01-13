import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {RegularText, SemiBoldText} from '~/components/ui/Text';
import {PrintIcon, CloseIcon} from '~/components/ui/Icon';
import * as api from '~/services/axios/Api';

const injectScript = `
(function () {
  var payload = { url: downloadUrl };
  window.postMessage(JSON.stringify(payload));
}());
`;

export default function Invoice({transactionId}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [widget, setWidget] = React.useState(undefined);

  useEffect(() => {
    let cleanup;
    if (modalVisible) {
      cleanup = api.widgets().then(res => {
        setWidget(res.data);
      });
    }
    return () => {
      cleanup;
    };
  }, [modalVisible]);

  const onMessage = e => {
    console.log(e);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <View style={[styles.rowGroup, styles.printIcon]}>
          <PrintIcon />
          <RegularText text="  Invoice" />
        </View>
      </TouchableOpacity>
      {modalVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          {widget !== undefined && (
            <View style={{flex: 1}}>
              <View style={styles.centeredView}>
                <View style={[styles.modalView]}>
                  <WebView
                    injectedJavaScript={injectScript}
                    originWhitelist={['*']}
                    useWebKit
                    onFileDownload={({nativeEvent}) => {
                      const {downloadUrl} = nativeEvent;
                      console.log('downloadUrl', downloadUrl);
                    }}
                    source={{
                      html: `<html lang="en">
                    <head>
                      <meta charset="UTF-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                      <title>Document</title>
                    </head>
                    <body>
                      <div id="widget-root"></div>
                      <script
                        src="https://sandbox.api.machpay.com/v2/widget/widget.js"
                        charset="utf-8"
                      ></script>
                      <script>
                        var widget = new MachnetWidget({
                          elementId: 'widget-root',
                          senderId: '${widget.referenceId}',
                          width: '100%',
                          height: '200px',
                          type: 'invoice',
                          locale: 'en',
                          multiStep: true,
                          stylesheet: 'https://uat.firmpay.com/firmpay-invoice.css',
                          token: '${widget.token}',
                          transactionId: "${transactionId}"
                        });
                        widget.init();
                        document.getElementById('widget-iframe').height = '97%';
                        document.getElementById("download").addEventListener('click', function (e) {
                          window.ReactNativeWebView.postMessage(JSON.stringify(e))
                        });
                      </script>
                    </body>
                  </html>`,
                    }}
                    onMessage={onMessage}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    injectedJavaScript={injectScript}
                  />
                </View>
              </View>
              <View style={styles.closeIcon}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <CloseIcon size={40} color={'#1F1F1F'} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rowGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  printIcon: {},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.44)',
  },
  modalView: {
    width: '90%',
    height: '70%',
    shadowColor: '#000',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 3,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: '8%',
    margin: 10,
    right: 10,
  },
});
