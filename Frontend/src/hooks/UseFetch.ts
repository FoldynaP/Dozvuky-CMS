import { useState, useEffect } from 'react';

interface FetchState<T> {
  loading: boolean;
  error: any;
  data: T | null;
}

// Makes cleaner response from strapi api response
function sanitizeApiResponse<T>(response: any): T | undefined {
  if (!response || !response.data) {
    return undefined;
  }
  if (Array.isArray(response.data)) {
    const sanitized = response.data.reduce(
      (acc: any[], curr: any) => {
        const item = {
          id: curr.id,
          ...curr.attributes,
        };
        acc.push(item);
        return acc;
      },
      []
    );
    return sanitized as T;
  }
  const sanitized = {
    id: response.data.id,
    ...response.data.attributes,
  };
  return sanitized as T;
}

// Hook for fetching data from strapi
const useFetch = <T>(url: string, component: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);

        if (!res.ok) {
          // throw new Error(`request failed with status ${res.status}`);
          setError(true);
        }
        const json = await res.json();

        const sanitizedData = sanitizeApiResponse<T>(json);
        if (sanitizedData === undefined) {
          setData(null);
        } else {
          setData(sanitizedData);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { loading, error, data };
};

export default useFetch;