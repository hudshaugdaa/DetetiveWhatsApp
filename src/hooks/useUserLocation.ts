import { useState, useEffect } from "react";
import { store } from "@/store";

interface UserLocation {
  city: string;
  stateCode: string;
  loading: boolean;
}

async function detectByIP(): Promise<{ city: string; stateCode: string } | null> {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(5000) });
    const data = await res.json();
    if (data.city && data.region_code && data.country_code === "BR") {
      return { city: data.city, stateCode: data.region_code };
    }
  } catch {}
  return null;
}

async function detectByGPS(): Promise<{ city: string; stateCode: string } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) { resolve(null); return; }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=pt-BR`,
            { signal: AbortSignal.timeout(5000) }
          );
          const data = await res.json();
          const addr = data.address || {};
          const city = addr.city || addr.town || addr.municipality || addr.county || "";
          const stateStr: string = addr["ISO3166-2-lvl4"] || "";
          const stateCode = stateStr.replace("BR-", "");
          if (city && stateCode) {
            resolve({ city, stateCode });
          } else {
            resolve(null);
          }
        } catch {
          resolve(null);
        }
      },
      () => resolve(null),
      { timeout: 5000 }
    );
  });
}

export function useUserLocation(): UserLocation {
  const [city, setCity] = useState(store.getCity());
  const [stateCode, setStateCode] = useState(store.getStateCode());
  const [loading, setLoading] = useState(!store.getCity());

  useEffect(() => {
    if (store.getCity()) { setLoading(false); return; }

    let done = false;
    const apply = (result: { city: string; stateCode: string } | null) => {
      if (done) return;
      if (result) {
        done = true;
        store.setCity(result.city);
        store.setStateCode(result.stateCode);
        setCity(result.city);
        setStateCode(result.stateCode);
        setLoading(false);
      }
    };

    Promise.all([detectByGPS(), detectByIP()]).then(([gps, ip]) => {
      apply(gps || ip);
      if (!gps && !ip) setLoading(false);
    });
  }, []);

  return { city, stateCode, loading };
}
