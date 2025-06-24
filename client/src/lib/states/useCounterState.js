import { useState } from "react";

// Yeee this does not work the same way that Svelte does.
// Do not use this.

const CounterComponent = () => {
  const [countInternal, setCountInternal] = useState(0);

  // const useCounterState = () => {
    // return {
      const get       = () => { return countInternal };
      const set       = (n) => setCountInternal(n);
      const reset     = () => setCountInternal(0);
      const increment = () => setCountInternal(countInternal + 1);
    // };
  // };

}
export { CounterComponent };