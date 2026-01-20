import { createContext, useContext, useState, ReactNode } from 'react';

interface CalendlyContextType {
  isCalendlyOpen: boolean;
  openCalendlyModal: () => void;
  closeCalendlyModal: () => void;
}

const CalendlyContext = createContext<CalendlyContextType | undefined>(undefined);

export function CalendlyProvider({ children }: { children: ReactNode }) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const openCalendlyModal = () => {
    setIsCalendlyOpen(true);
  };

  const closeCalendlyModal = () => {
    setIsCalendlyOpen(false);
  };

  return (
    <CalendlyContext.Provider value={{
      isCalendlyOpen,
      openCalendlyModal,
      closeCalendlyModal,
    }}>
      {children}
    </CalendlyContext.Provider>
  );
}

export function useCalendlyContext() {
  const context = useContext(CalendlyContext);
  if (context === undefined) {
    throw new Error('useCalendlyContext must be used within a CalendlyProvider');
  }
  return context;
}