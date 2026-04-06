import { STORAGE_KEYS } from "../constants";

/**
 * Type-safe localStorage wrapper with error handling
 */
class LocalStorageService {
  private isAvailable(): boolean {
    try {
      const test = "__localStorage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  get<T>(key: string, defaultValue?: T): T | null {
    if (!this.isAvailable()) {
      return defaultValue ?? null;
    }

    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue ?? null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue ?? null;
    }
  }

  set<T>(key: string, value: T): boolean {
    if (!this.isAvailable()) {
      console.warn("localStorage is not available");
      return false;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch storage event for cross-tab sync
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: JSON.stringify(value),
          storageArea: localStorage,
        })
      );
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  }

  remove(key: string): boolean {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  }

  clear(): boolean {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  }
}

export const storage = new LocalStorageService();

// Type-safe helpers for common storage operations
export const homeTeamStorage = {
  get: (): string | null => storage.get<string>(STORAGE_KEYS.HOME_TEAM),
  set: (teamId: string): boolean => storage.set(STORAGE_KEYS.HOME_TEAM, teamId),
  remove: (): boolean => storage.remove(STORAGE_KEYS.HOME_TEAM),
};

export const favoritesStorage = {
  get: (): string[] => storage.get<string[]>(STORAGE_KEYS.FAVORITES, []) ?? [],
  set: (favorites: string[]): boolean => storage.set(STORAGE_KEYS.FAVORITES, favorites),
  add: (id: string): boolean => {
    const favorites = favoritesStorage.get();
    if (!favorites.includes(id)) {
      return favoritesStorage.set([...favorites, id]);
    }
    return true;
  },
  remove: (id: string): boolean => {
    const favorites = favoritesStorage.get();
    return favoritesStorage.set(favorites.filter((fav) => fav !== id));
  },
};
