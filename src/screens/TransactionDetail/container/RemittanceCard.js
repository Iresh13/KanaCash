import React from 'react';
import Card from './Card';
import {RegularText} from '~/components/ui/Text';

export default function RemittanceCard() {
  return (
    <Card title="Remittance Purpose">
      <RegularText text={'Family Expenses'} />
    </Card>
  );
}
