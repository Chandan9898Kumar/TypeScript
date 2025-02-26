import { useRef } from "react";

function useEffectPolyfill(
  effect: () => void | (() => void),
  dependencies?: unknown[]
): void {
  const ref = useRef<{
    cleanup: (() => void) | void;
    deps: unknown[] | undefined;
    firstRender: boolean;
  }>({
    cleanup: undefined,
    deps: undefined,
    firstRender: true,
  });

  // Cleanup function to be run before next effect
  const cleanup = () => {
    if (typeof ref.current.cleanup === "function") {
      ref.current.cleanup();
    }
  };

  // Check if deps changed
  const hasChanged = !dependencies
    ? true // No dependencies means run every time
    : !ref.current.deps ||
      dependencies.length !== ref.current.deps.length ||
      ref.current.deps.some((dep, index) => dep !== dependencies[index]);

  // Run effect if:
  // 1. It's the first render
  // 2. No dependencies array was provided (run every time)
  // 3. Dependencies have changed
  if (ref.current.firstRender || !dependencies || hasChanged) {
    cleanup(); // Clean up previous effect

    // Run the effect and store any cleanup function
    ref.current.cleanup = effect();
    ref.current.deps = dependencies;
    ref.current.firstRender = false;
  }

  // Handle component unmount
  useRef(() => {
    return () => cleanup();
  });
}

export default useEffectPolyfill;

//  Here's how to use it with different scenarios:

/**
 * function ExampleComponent({ userId }: { userId: string }) {
  const [data, setData] = useState<string>("");

  // Effect with cleanup (like subscription)
  useEffectPolyfill(() => {
    const connection = createConnection(userId);
    connection.connect();

    // Cleanup function
    return () => {
      connection.disconnect();
    };
  }, [userId]);

  // Effect without dependencies (runs after every render)
  useEffectPolyfill(() => {
    console.log("This runs after every render");
  });

  // Effect with empty dependencies (runs once, like componentDidMount)
  useEffectPolyfill(() => {
    console.log("This runs only on mount");
  }, []);

  // Effect with dependencies
  useEffectPolyfill(() => {
    document.title = `Data: ${data}`;
  }, [data]);

  return <div>{data}</div>;
}

 */

//  Here's a more practical example with TypeScript types:

/**
 * interface User {
  id: string;
  name: string;
}

interface ApiResponse {
  data: User;
  error?: string;
}

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffectPolyfill(() => {
    let isSubscribed = true;

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const result: ApiResponse = await response.json();

        if (isSubscribed) {
          if (result.error) {
            setError(result.error);
          } else {
            setUser(result.data);
          }
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      }
    };

    fetchUser();

    // Cleanup function
    return () => {
      isSubscribed = false;
    };
  }, [userId]);

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>ID: {user.id}</p>
    </div>
  );
}

 */
