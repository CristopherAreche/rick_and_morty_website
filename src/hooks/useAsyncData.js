import { useEffect, useState } from "react";

const getErrorMessage = (error) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong while loading data.";
};

const useAsyncData = ({ requestFn, deps, initialData }) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    setData(initialData);
    setError("");
    setIsLoading(true);

    (async function loadData() {
      try {
        const nextData = await requestFn({ signal: controller.signal });

        if (!isActive) {
          return;
        }

        setData(nextData);
      } catch (requestError) {
        if (requestError.name === "AbortError" || !isActive) {
          return;
        }

        setData(initialData);
        setError(getErrorMessage(requestError));
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isActive = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, error, isLoading };
};

export default useAsyncData;
