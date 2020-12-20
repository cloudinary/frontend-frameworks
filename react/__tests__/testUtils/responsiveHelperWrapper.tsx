import React, {useEffect, useRef, useState} from 'react';

/**
 * Simulates clientWidth
 * Initializes clientWidth with 250
 */
export function ResponsiveHelper(props: { children: React.ReactNode }) {
  const ref = useRef(null);
  const [refElement, setRefElement] = useState(false)
  useEffect(() => {
    const parentElement = ref.current as unknown as HTMLElement;
    Object.defineProperty(parentElement, 'clientWidth', {value: 250, configurable: true});
    // @ts-ignore
    setRefElement(ref.current);
  }, []);
  return <div
    id='id'
    ref={ref}
  >
    {refElement && props.children}
  </div>
}
