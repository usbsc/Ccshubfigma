import { useEffect, useState } from "react";
import { UPDATE_INTERVALS } from "../constants";

/**
 * Hook to simulate auto-updating data
 * In production, this would fetch from MaxPreps, Hudl, etc.
 */
export function useAutoUpdate(intervalMs: number = UPDATE_INTERVALS.SCORES) {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate(new Date());
      // Auto-update triggered - would fetch from API in production
      // console.log("Auto-update triggered at:", new Date().toLocaleTimeString());
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return lastUpdate;
}
