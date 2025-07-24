import { useAppSelector } from '@/lib/hooks';
import React, { createContext, useContext, useState } from 'react';

type InfobarContextType = {
  showInfobar: boolean;
  toggleInfobar: () => void;
  setShowInfobar: (value: boolean) => void;
};

const InfobarContext = createContext<InfobarContextType | undefined>(undefined);

export const InfobarProvider = ({ children }: { children: React.ReactNode }) => {
  const [showInfobar, setShowInfobar] = useState(false);
  const { activeTrack } = useAppSelector(state => state.track);

  const toggleInfobar = () => {
    if(activeTrack){
        setShowInfobar(prev => !prev)
    }   
};

  return (
    <InfobarContext.Provider value={{ showInfobar, toggleInfobar, setShowInfobar }}>
      {children}
    </InfobarContext.Provider>
  );
};

export const useInfobar = (): InfobarContextType => {
  const context = useContext(InfobarContext);
  if (!context) throw new Error('useInfobar must be used within InfobarProvider');
  return context;
};
