import { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  deliveryAddress: {
    city: string;
    street: string;
    house: string;
    apartment: string;
    postalCode: string;
  };
  savedPaymentMethods: PaymentMethod[];
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'yandex-pay' | 'sbp';
  last4?: string;
  isDefault: boolean;
}

interface ProfileContextType {
  profile: UserProfile | null;
  updateProfile: (data: Partial<UserProfile>) => void;
  updateAddress: (address: UserProfile['deliveryAddress']) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
}

const DEMO_PROFILE: UserProfile = {
  id: 'user-001',
  fullName: 'Иванов Иван Иванович',
  phone: '+7 (999) 123-45-67',
  email: 'ivanov@example.com',
  deliveryAddress: {
    city: 'Москва',
    street: 'ул. Пушкина',
    house: '10',
    apartment: '25',
    postalCode: '101000',
  },
  savedPaymentMethods: [
    {
      id: 'card-1',
      type: 'card',
      last4: '4242',
      isDefault: true,
    },
    {
      id: 'yp-1',
      type: 'yandex-pay',
      isDefault: false,
    },
  ],
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(DEMO_PROFILE);

  const updateProfile = (data: Partial<UserProfile>) => {
    if (profile) {
      setProfile({ ...profile, ...data });
    }
  };

  const updateAddress = (address: UserProfile['deliveryAddress']) => {
    if (profile) {
      setProfile({ ...profile, deliveryAddress: address });
    }
  };

  const addPaymentMethod = (method: PaymentMethod) => {
    if (profile) {
      setProfile({
        ...profile,
        savedPaymentMethods: [...profile.savedPaymentMethods, method],
      });
    }
  };

  const removePaymentMethod = (id: string) => {
    if (profile) {
      setProfile({
        ...profile,
        savedPaymentMethods: profile.savedPaymentMethods.filter(m => m.id !== id),
      });
    }
  };

  const setDefaultPaymentMethod = (id: string) => {
    if (profile) {
      setProfile({
        ...profile,
        savedPaymentMethods: profile.savedPaymentMethods.map(m => ({
          ...m,
          isDefault: m.id === id,
        })),
      });
    }
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      updateProfile,
      updateAddress,
      addPaymentMethod,
      removePaymentMethod,
      setDefaultPaymentMethod,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}
