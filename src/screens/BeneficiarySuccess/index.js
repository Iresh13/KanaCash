import React from 'react';
import {ThumbsUp} from '~/components/ui/Image';
import GenericView from '~/components/ui/GenericView';
import Success from '~/components/ui/Success';

export default function BeneficiarySuccess({navigation}) {
  return (
    <GenericView>
      <Success
        onPress={() => navigation.popToTop()}
        icon={<ThumbsUp />}
        title={'Beneficiary Added!'}
        caption={'New Beneficiary has been added \nsuccessfully'}
      />
    </GenericView>
  );
}
