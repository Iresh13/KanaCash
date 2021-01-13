import React from 'react';
import {Dimensions, StyleSheet, View, Alert} from 'react-native';
import GenericView from '~/components/ui/GenericView';
import Header from '~/components/ui/Header';
import {WebView} from 'react-native-webview';
import Button from '~/components/ui/Button';
import * as api from '~/services/axios/Api';

/**
 * @param {navigation} param
 * @param {route}
 * route.params.widgetType
 * Type of Widget to render
 * kyc, bank, card, tier, invoice
 */
// when get the success
// may be listen event ?
const injectScript = `
(function () {
  window.postMessage(document.getElementsByClassName("remit-msg-success"))
}());
`;

const STYLE_CSS = 'https://uat.kanacash.com/kanacash-raas-style.css';

export default function Widgets({route, navigation}) {
  // const webViewRef = React.useRef();
  const webviewRef = React.useRef(null);
  const {widgetType, onGoBack} = route.params;
  const [type, setType] = React.useState(widgetType);
  const [widget, setWidget] = React.useState(undefined);
  const [completeState, setCompleteState] = React.useState(false);

  React.useEffect(() => {
    api.widgets().then(res => {
      setWidget(res.data);
    });
  }, []);

  const handleWebViewNavigationStateChange = newNavState => {
    // webview.stopLoading();
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const {url} = newNavState;
    console.log('nav state', newNavState);
    if (!url) {
      return;
    }
    // one way to handle a successful form submit is via query strings
    // do something if the user is verified
    if (url.includes('')) {
      // webview.stopLoading();
      // NavigationService.back();
      // navigation.navigate('DashboardStack');
    }
  };

  const onMessage = e => {
    // e.nativeEvent.data.type    = kyc || bank || tier
    // e.nativeEvent.data.status  = eventName
    // e.nativeEvent.data.message = additional message
    // "{"type":"BANK","status":"BANK_ADDED","message":"Sender bank added successfully"}"
    const webMessage = JSON.parse(e.nativeEvent.data);
    if (webMessage?.message) {
      console.log('webMessage', webMessage);
      if (
        webMessage.message === 'KYC RETRY' ||
        webMessage.message === 'SUSPENDED'
      ) {
        // webViewRef.current.reload()
      } else {
        Alert.alert(webMessage?.message);
        setCompleteState(true);
        onGoBack && route.params.onGoBack({selected: true});
        navigation.goBack();
      }
    }
  };

  const onPressContinue = () => {
    onGoBack && route.params.onGoBack({selected: true});
    navigation.goBack();
  };

  return (
    <GenericView
      backgroundColor="#fff"
      loading={widget === undefined}
      header={<Header title={`${type.toUpperCase()}`} backButtonVisible />}
      footer={
        completeState ? (
          <View style={styles.footerStyle}>
            <Button text="Continue" onPress={onPressContinue} />
          </View>
        ) : (
          <></>
        )
      }>
      {widget !== undefined && (
        <WebView
          style={{flex: 1}}
          injectedJavaScript={injectScript}
          // ref={webviewRef => {
          //   webview = webviewRef;
          // }}
          // ref={ref => (webViewRef.current = ref)}
          ref={webviewRef}
          originWhitelist={['*']}
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
                  type: '${type}',
                  locale: 'en',
                  multiStep: true,
                  stylesheet: '${STYLE_CSS}',
                  token: '${widget.token}',
                });
                widget.init();
                document.getElementById('widget-iframe').height = '${Dimensions.get(
                  'window',
                ).height - 150}';
                window.addEventListener('message', function (e) {
                  window.ReactNativeWebView.postMessage(JSON.stringify(e.data))
                });
              </script>
            </body>
          </html>`,
          }}
          onMessage={onMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          // do not store any data within the lifetime of the WebView.
          incognito
        />
      )}
    </GenericView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateWrapper: {
    marginBottom: 15,
  },
  boldText: {
    fontWeight: 'bold',
  },
  footerStyle: {
    alignItems: 'center',
  },
});
