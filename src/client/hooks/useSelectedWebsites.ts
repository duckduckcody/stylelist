import { useEffect, useState } from 'react';
import { LocalStorageKey } from '../constants';
import { useWindow } from './useWindow';

interface ReturnProps {
  selectedWebsites: string[] | undefined;
  setSelectedWebsites: (newlySelectedWebsites: string[]) => void;
}

export const useSelectedWebsites = (): ReturnProps => {
  const window = useWindow();
  const [selectedWebsites, setSelectedWebsitesState] = useState<string[] | undefined>(undefined);

  const setSelectedWebsites = (newlySelectedWebsites: string[]) => {
    // save selected website changes to local storage
    window?.localStorage.setItem(
      LocalStorageKey.Websites,
      JSON.stringify(newlySelectedWebsites)
    );
    setSelectedWebsitesState(newlySelectedWebsites);
  };

  useEffect(() => {
    if (window) {
      const websites = window.localStorage.getItem(LocalStorageKey.Websites);
      if (websites) setSelectedWebsitesState(JSON.parse(websites));
      else setSelectedWebsitesState([]);
    }
  }, [window]);

  return { selectedWebsites, setSelectedWebsites };
};
