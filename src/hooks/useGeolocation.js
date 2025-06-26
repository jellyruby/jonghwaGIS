// hooks/useGeolocation.js
import { useState, useEffect } from 'react';

const useGeolocation = (options) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({}); // 위치 정보를 담을 객체

  useEffect(() => {
    const successHandler = (position) => {
      setLoading(false);
      setError(null);
      setData({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
    };

    const errorHandler = (err) => {
      setLoading(false);
      setError(err);
    };

    // Geolocation API 지원 여부 확인
    if (!navigator.geolocation) {
      setError({ code: -1, message: 'Geolocation is not supported' });
      setLoading(false);
      return;
    }

    // 위치 정보 요청
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);

  }, [options]); // options가 변경될 때마다 재실행

  return { loading, error, data };
};

export default useGeolocation;