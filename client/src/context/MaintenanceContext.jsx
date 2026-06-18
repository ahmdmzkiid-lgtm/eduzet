import { createContext, useState, useEffect } from 'react';
import { settingsService } from '../services/api';

export const MaintenanceContext = createContext(null);

export const MaintenanceProvider = ({ children }) => {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkMaintenance = async () => {
    try {
      const res = await settingsService.get();
      setIsMaintenance(res.data.data?.maintenance_mode === 'true');
    } catch {
      setIsMaintenance(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkMaintenance();
    const interval = setInterval(checkMaintenance, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MaintenanceContext.Provider value={{ isMaintenance, loading, refresh: checkMaintenance }}>
      {children}
    </MaintenanceContext.Provider>
  );
};
