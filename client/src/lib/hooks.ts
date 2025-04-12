import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export function useVideoTimer(duration: string): [string, number, (value: number) => void] {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  
  useEffect(() => {
    // Convert duration format (e.g., "5:46") to seconds
    const [minutes, seconds] = duration.split(":").map(Number);
    const totalSeconds = minutes * 60 + seconds;
    
    // Format current time based on progress
    const currentSeconds = Math.floor((totalSeconds * progress) / 100);
    const currentMinutes = Math.floor(currentSeconds / 60);
    const remainingSeconds = currentSeconds % 60;
    setCurrentTime(`${currentMinutes}:${remainingSeconds.toString().padStart(2, "0")}`);
  }, [duration, progress]);
  
  return [currentTime, progress, setProgress];
}
