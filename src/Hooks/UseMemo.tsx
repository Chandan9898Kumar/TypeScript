import { useRef } from "react";

function useMemoPolyfill<T>(factory: () => T, dependencies: unknown[]): T {
  const ref = useRef<{
    value: T | undefined;
    deps: unknown[] | undefined;
  }>({
    value: undefined,
    deps: undefined,
  });

  // Check if deps changed
  const hasChanged =
    !ref.current.deps ||
    !dependencies ||
    dependencies.length !== ref.current.deps.length ||
    ref.current.deps.some((dep, index) => dep !== dependencies[index]);

  // If deps changed or first render, compute and store new value
  if (hasChanged) {
    ref.current.value = factory();
    ref.current.deps = dependencies;
  }

  // Since we know value will be assigned in first render, we can assert it's non-undefined
  return ref.current.value as T;
}

export default useMemoPolyfill;

/**
 Let's break down how this polyfill works:

The function takes two parameters:

factory: A function that computes and returns a value

dependencies: An array of dependencies that determine when to recompute

We use useRef to persist the memoized value and dependencies between renders

The polyfill checks if dependencies have changed by:

Checking if deps exist

Comparing lengths of current and new deps arrays

Comparing each dependency value

If dependencies changed or it's the first render:

Compute new value using factory function

Store new value and dependencies
 */

//  How to use It.

// function MyComponent({ data, filter }) {
//     const filteredData = useMemoPolyfill(() => {
//       return data.filter(item => item.includes(filter));
//     }, [data, filter]);

//     return (
//       <div>
//         {filteredData.map(item => (
//           <div key={item}>{item}</div>
//         ))}
//       </div>
//     );
//   }
