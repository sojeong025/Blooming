import { useState } from "react";

function useLoading(action) {
  const [isLoading, setIsLoading] = useState(false);

  const handleData = async (...args) => {
    setIsLoading(true);
    try {
      const result = await action(...args);
      setIsLoading(false);
      return result;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return [isLoading, handleData];
}

export default useLoading;
