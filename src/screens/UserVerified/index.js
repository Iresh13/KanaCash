import React from 'react';
import {ThumbsUp} from '~/components/ui/Image';
import GenericView from '~/components/ui/GenericView';
import Success from '~/components/ui/Success';
import {
  useDispatch,
  // useSelector
} from 'react-redux';
import {setToken} from '~/store/actions/AuthAction';
// import {NAVIGATION_TO_DRAWER} from '../../navigation/routes';
// import {CommonActions} from '@react-navigation/native';

export default function UserVerified({navigation}) {
  const dispatch = useDispatch();
  // const token = useSelector(state => state.signup.token);

  const onPressContinue = () => {
    dispatch(
      setToken({
        isAuthenticated: true,
      }),
    );
  };

  return (
    <GenericView>
      <Success
        onPress={onPressContinue}
        icon={<ThumbsUp />}
        title={'Success!'}
        caption={
          'You have successfully registered in our \napp and can start sending money'
        }
      />
    </GenericView>
  );
}
