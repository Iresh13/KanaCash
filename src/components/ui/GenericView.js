import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import theme from '~/components/theme/Style';
import {showLoader, hideLoader} from '~/store/actions/LoaderAction';
import {useDispatch} from 'react-redux';

const DismissKeyboardHOC = Comp => {
  return ({children, disabled, ...props}) => (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      disabled={disabled}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};

const DismissKeyboardView = DismissKeyboardHOC(View);

const GenericTemplate = ({
  children,
  footer,
  scrollable,
  style,
  padding,
  bounces,
  attributes,
  backgroundColor,
  header,
  loading,
  keyboardView,
}) => {
  const dispatch = useDispatch();
  const ViewGroup = scrollable ? ScrollView : View;

  React.useEffect(() => {
    if (loading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [loading]);

  return (
    <SafeAreaView style={[styles.container(backgroundColor)]}>
      {header}
      <View style={styles.body(padding)}>
        <ViewGroup
          bounces={bounces}
          style={[styles.content(backgroundColor, padding), style]}
          keyboardShouldPersistTaps="always"
          {...attributes}>
          <DismissKeyboardView style={styles.full} disabled={!keyboardView}>
            {children}
          </DismissKeyboardView>
        </ViewGroup>
      </View>
      {footer}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  container: backgroundColor => ({
    flex: 1,
    backgroundColor: backgroundColor,
  }),
  body: padding => ({
    flex: 1,
    paddingTop: padding ? theme.themeMainPadding : 0,
  }),
  content: (backgroundColor, padding) => ({
    flex: 1,
    backgroundColor: backgroundColor,
    paddingHorizontal: padding ? theme.themeMainPadding : 0,
  }),
});

GenericTemplate.propTypes = {
  header: PropTypes.element,
  children: PropTypes.any.isRequired,
  scrollable: PropTypes.bool,
  footer: PropTypes.element,
  style: PropTypes.object,
  padding: PropTypes.bool,
  loading: PropTypes.bool,
  keyboardView: PropTypes.bool,
};

GenericTemplate.defaultProps = {
  keyboardView: false,
  loading: false,
  backgroundColor: theme.backgroundColor,
  bounces: true,
  padding: false,
  scrollable: false,
  header: <></>,
  footer: <></>,
  style: {},
};

export default GenericTemplate;
