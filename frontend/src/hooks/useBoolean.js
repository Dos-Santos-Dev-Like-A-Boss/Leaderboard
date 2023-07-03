import { useMemo, useState } from 'react';

export const useBoolean = (initial = false) => {
  const [val, setVal] = useState(initial);

  return useMemo(() => {
    return {
      state: val,
      on: () => setVal(true),
      off: () => setVal(false),
      toggle: () => setVal(prevState => !prevState),
    };
  }, [val]);
};