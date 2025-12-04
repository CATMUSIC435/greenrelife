'use client';

import { useEffect, useRef, useState } from 'react';

type Position = {
  lat: number | null;
  lng: number | null;
  accuracy?: number | null;
};

type GeoStatus = 'granted' | 'prompt' | 'denied' | 'unknown';

export function useGeolocation(watch: boolean = false) {
  const [position, setPosition] = useState<Position>({
    lat: null,
    lng: null,
    accuracy: null,
  });

  const [status, setStatus] = useState<GeoStatus>('unknown');
  const [error, setError] = useState<string | null>(null);

  const watchId = useRef<number | null>(null);

  // Check permission (Permission API)
  const checkPermission = async () => {
    if (!navigator.permissions) {
      return;
    }
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      setStatus(result.state as GeoStatus);

      result.onchange = () => {
        setStatus(result.state as GeoStatus);
      };
    // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (e) {}
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks-extra/no-direct-set-state-in-use-effect
      setError('Browser does not support geolocation');
      return;
    }

    checkPermission();

    if (watch) {
      // Follow user moving
      watchId.current = navigator.geolocation.watchPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          });
          setError(null);
        },
        (err) => {
          setError(err.message);
        },
      );

      return () => {
        if (watchId.current !== null) {
          navigator.geolocation.clearWatch(watchId.current);
        }
      };
    }

    // One-time get position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
        setError(null);
      },
      (err) => {
        setError(err.message);
      },
    );
  }, [watch]);

  return { position, status, error };
}
