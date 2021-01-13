import React, {useState, useCallback} from 'react';

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const validateOnChange = useCallback(
    newValue => {
      if (newValue === undefined) return;
      if (!new RegExp(/^[0-9]*(\.[0-9]{0,2})?$/).test(newValue)) return; //Must not contain numbers

      if (newValue !== undefined && newValue > 0) {
        // newValue = Number(newValue).toString();
        // newValue = newValue.match(/^(0+)(\d+)$/);
        const match = newValue.match ? newValue.match(/^(0+)(\d+)$/) : newValue;
        newValue = (match && match[2]) || newValue;
      }

      setValue(newValue);
    },
    [setValue],
  );

  React.useEffect(() => {
    validateOnChange(value);
  }, [validateOnChange, value]);

  return {
    value,
    onChangeText: txt => validateOnChange(txt),
    setValue,
  };
};

export default useFormInput;
