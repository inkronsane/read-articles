import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchData = async () => {
      try {
        const token = Cookies.get("jwt");
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "https://inkronsane.github.io/", // Додано заголовок CORS
          },
          signal: abortCont.signal,
        });
        if (!response.ok) {
          throw Error("could not fetch the data for that resource");
        }
        const responseData = await response.json();
        setData(responseData);
        setIsPending(false);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(error.message);
        }
      }
    };

    fetchData();

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
