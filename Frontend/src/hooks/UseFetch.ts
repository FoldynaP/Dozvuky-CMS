import React, { useState } from 'react';
import { useEffect } from 'react';

//Makes cleaner response from strapi api response
function sanitizeApiResponse(response) {
  if (!response || !response.data) {
      return undefined
  }
  if (Array.isArray(response.data)) {
      const sanitized = response.data.reduce(
          (acc, curr) => {
              const item = {
                  id: curr.id,
                  ...curr.attributes,
              }
              acc.push(item)
              return acc
          },
          [],
      )
      return sanitized
  }
  const sanitized = {
      id: response.data.id,
      ...response.data.attributes,
  }
  return sanitized
}

//Hook for fetching data from strapi
const useFetch = (url:string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();

        setData(sanitizeApiResponse(json));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [url])
  return  {loading, error, data}
}

export default useFetch;
