import { useEffect, useState } from 'react';

function useFetch(url = '', options = null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        const getData = await response.json();
        setData(getData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.log(err);
      }
    };

    fetchData();
  }, [url, options]);
  return [data, loading, error];
}

export default useFetch;
