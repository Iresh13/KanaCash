import React from 'react';
import {RegularText, SemiBoldText} from '~/components/ui/Text';

export default function ReviewWrapper() {
  return (
    <React.Fragment>
      <SemiBoldText text="Here is your transaction summary" />
      <RegularText />
      <RegularText text="Please review to make sure everything is correct before proceeding." />
      <RegularText text="" />
    </React.Fragment>
  );
}
