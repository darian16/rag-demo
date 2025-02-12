import { createContext, useContext } from 'react';
import {  Offline } from 'react-detect-offline';
import { useOffline } from 'hooks/useOffline';
import { useMemo } from 'react';

const initialStatus = {
  isOnline: true
}

export const OnlineContext = createContext(initialStatus);

export const useOnlineContext = () => {
  const { isOnline } = useContext(OnlineContext);
  return { isOnline };
};

export const OnlineProvider = ({ children }) => {
  const { isOnline, changeOnlineStatus } = useOffline();

  const value = useMemo(() => {
    return ({
      isOnline
    })
  },[isOnline])

  return (
    <OnlineContext.Provider value={value}>
        <Offline
          polling={false}
          onChange={(online) => (
            changeOnlineStatus(online)      
        )}
        />
        {children}
    </OnlineContext.Provider>
  );
};
