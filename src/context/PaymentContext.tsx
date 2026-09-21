import { createContext, useContext, useState, ReactNode } from 'react';

interface PaymentContextType {
  isOpen: boolean;
  planData: {
    planName: string;
    amount: string;
    period: string;
    features: string[];
  } | null;
  openPayment: (planName: string, amount: string, period: string, features: string[]) => void;
  closePayment: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [planData, setPlanData] = useState<PaymentContextType['planData']>(null);

  const openPayment = (planName: string, amount: string, period: string, features: string[]) => {
    setPlanData({ planName, amount, period, features });
    setIsOpen(true);
  };

  const closePayment = () => {
    setIsOpen(false);
    setPlanData(null);
  };

  return (
    <PaymentContext.Provider value={{ isOpen, planData, openPayment, closePayment }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within PaymentProvider');
  }
  return context;
}
