import { useRef } from "react";

function useCallbackPolyfill<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
  dependencies: unknown[]
): (...args: Args) => Return {
  const ref = useRef<{
    fn: ((...args: Args) => Return) | undefined;
    deps: unknown[] | undefined;
  }>({
    fn: undefined,
    deps: undefined,
  });

  // Check if deps changed
  const hasChanged =
    !ref.current.deps ||
    !dependencies ||
    dependencies.length !== ref.current.deps.length ||
    ref.current.deps.some((dep, index) => dep !== dependencies[index]);

  // If deps changed or first render, update the callback
  if (hasChanged) {
    ref.current.fn = callback;
    ref.current.deps = dependencies;
  }

  // Create a stable callback that always references the latest function
  const stableCallback = useRef<(...args: Args) => Return>((...args) => {
    // Assert fn is defined since it will be after first render
    const fn = ref.current.fn as (...args: Args) => Return;
    return fn(...args);
  }).current;

  return stableCallback;
}

export default useCallbackPolyfill;

//  How to use It.

// function MyComponent({ onSubmit }: { onSubmit: (data: string) => void }) {
//     const [count, setCount] = useState(0);

//     const handleClick = useCallbackPolyfill(() => {
//       console.log('Current count:', count);
//       onSubmit(`Count is ${count}`);
//     }, [count, onSubmit]);

//     return (
//       <div>
//         <p>Count: {count}</p>
//         <button onClick={() => setCount(count + 1)}>Increment</button>
//         <button onClick={handleClick}>Submit</button>
//       </div>
//     );
//   }

/**
 * Let's break down how this polyfill works:

Type Parameters and Arguments:

T extends (...args: any[]) => any: Ensures the callback is a function type

Takes a callback function and dependencies array as arguments

Internal Storage:

Uses useRef to store both the function and dependencies

Maintains type safety with proper TypeScript types

Change Detection:

Checks if dependencies have changed using the same logic as useMemo

Updates the stored function and deps if changes are detected

Stable Callback:

Creates a stable function reference that never changes between renders

Always calls the latest version of the callback

Preserves the function signature and types

Key differences from useMemo:

Specifically designed for functions

Returns a stable function reference

Ensures the latest callback is always used

Maintains proper typing for function arguments and return value
 */
