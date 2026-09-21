import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TrialContextType {
  trialStart: number | null;
  trialEnd: number | null;
  isTrialActive: boolean;
  hoursRemaining: number;
  startTrial: () => void;
  canDownload: boolean;
  downloadPrice: number;
  setDownloadPrice: (price: number) => void;
}

const TRIAL_DURATION_HOURS = 48;
const DEFAULT_DOWNLOAD_PRICE = 1000;

const TrialContext = createContext<TrialContextType | undefined>(undefined);

export function TrialProvider({ children }: { children: ReactNode }) {
  const [trialStart, setTrialStart] = useState<number | null>(() => {
    const saved = localStorage.getItem('trialStart');
    return saved ? parseInt(saved) : null;
  });

  const [downloadPrice, setDownloadPrice] = useState<number>(() => {
    const saved = localStorage.getItem('downloadPrice');
    const parsed = saved ? parseInt(saved) : NaN;
    return isNaN(parsed) ? DEFAULT_DOWNLOAD_PRICE : parsed;
  });

  const trialEnd = trialStart ? trialStart + TRIAL_DURATION_HOURS * 60 * 60 * 1000 : null;
  const isTrialActive = trialStart !== null && trialEnd !== null && Date.now() < trialEnd;
  const hoursRemaining = trialEnd ? Math.max(0, Math.floor((trialEnd - Date.now()) / (1000 * 60 * 60))) : 0;

  useEffect(() => {
    if (trialStart) {
      localStorage.setItem('trialStart', trialStart.toString());
    }
  }, [trialStart]);

  useEffect(() => {
    localStorage.setItem('downloadPrice', downloadPrice.toString());
  }, [downloadPrice]);

  const startTrial = () => {
    if (!trialStart) {
      setTrialStart(Date.now());
    }
  };

  const canDownload = !isTrialActive;

  return (
    <TrialContext.Provider value={{
      trialStart,
      trialEnd,
      isTrialActive,
      hoursRemaining,
      startTrial,
      canDownload,
      downloadPrice,
      setDownloadPrice,
    }}>
      {children}
    </TrialContext.Provider>
  );
}

export function useTrial() {
  const context = useContext(TrialContext);
  if (!context) {
    throw new Error('useTrial must be used within TrialProvider');
  }
  return context;
}
