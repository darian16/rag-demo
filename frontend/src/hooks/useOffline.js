import { useEffect, useState } from 'react';

export const useOffline = () => {
  const [offlineClass, setOfflineClass] = useState("");
  const [isOnline, setIsonline] = useState(navigator.onLine);
  
  const changeOnlineStatus = (status) => {
    setIsonline(status)
  }

  const changeOfflineClass = (online) => {
    setOfflineClass(online ? "online" : "offline");
  };

  useEffect(() => {
    changeOfflineClass(isOnline)
  },[isOnline])

  return { offlineClass, changeOfflineClass, isOnline, changeOnlineStatus };
};
