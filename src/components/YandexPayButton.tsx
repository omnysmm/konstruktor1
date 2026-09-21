import { useEffect, useState } from 'react';

interface YandexPayButtonProps {
  merchantId: string;
  amount: string;
  orderId: string;
  items?: Array<{ label: string; amount: string }>;
  onSuccess?: (token: string) => void;
  onError?: (error: string) => void;
  onAbort?: () => void;
  buttonType?: 'pay' | 'buy' | 'subscribe';
  theme?: 'dark' | 'light' | 'white';
}

declare global {
  interface Window {
    YaPay: any;
  }
}

export function YandexPayButton({
  merchantId,
  amount,
  orderId,
  items = [],
  onSuccess,
  onError,
  onAbort,
  buttonType = 'pay',
  theme = 'dark',
}: YandexPayButtonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Загрузка SDK Yandex Pay
    const script = document.createElement('script');
    script.src = 'https://pay.yandex.ru/sdk/v1/pay.js';
    script.async = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    script.onerror = () => {
      setError('Не удалось загрузить Yandex Pay SDK');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !window.YaPay) return;

    const YaPay = window.YaPay;
    const container = document.getElementById(`yandex-pay-button-${orderId}`);
    if (!container) return;

    const paymentData = {
      env: YaPay.PaymentEnv.Sandbox, // Режим песочницы для тестирования
      version: 2,
      countryCode: YaPay.CountryCode.Ru,
      currencyCode: YaPay.CurrencyCode.Rub,
      merchant: {
        id: merchantId,
        name: 'SiteBuilder Pro',
        url: window.location.origin,
      },
      order: {
        id: orderId,
        total: { amount },
        items: items.length > 0 ? items : [{ label: 'Оплата', amount }],
      },
      paymentMethods: [
        {
          type: YaPay.PaymentMethodType.Card,
          gateway: 'test-gateway',
          gatewayMerchantId: 'test-gateway-merchant-id',
          allowedAuthMethods: [YaPay.AllowedAuthMethod.PanOnly],
          allowedCardNetworks: [
            YaPay.AllowedCardNetwork.Visa,
            YaPay.AllowedCardNetwork.Mastercard,
            YaPay.AllowedCardNetwork.Mir,
            YaPay.AllowedCardNetwork.Maestro,
          ],
        },
      ],
    };

    const onPaymentProcess = (event: any) => {
      console.log('Payment token:', event.token);
      onSuccess?.(event.token);
    };

    const onPaymentError = (event: any) => {
      console.error('Payment error:', event.reason);
      onError?.(event.reason);
    };

    const onPaymentAbort = () => {
      console.log('Payment aborted');
      onAbort?.();
    };

    YaPay.createSession(paymentData, {
      onProcess: onPaymentProcess,
      onAbort: onPaymentAbort,
      onError: onPaymentError,
    })
      .then((paymentSession: any) => {
        container.innerHTML = '';
        paymentSession.mountButton(container, {
          type: buttonType === 'pay' ? YaPay.ButtonType.Pay : 
                buttonType === 'buy' ? YaPay.ButtonType.Buy : 
                YaPay.ButtonType.Subscribe,
          theme: theme === 'dark' ? YaPay.ButtonTheme.Black : 
                 theme === 'light' ? YaPay.ButtonTheme.White : 
                 YaPay.ButtonTheme.White,
          width: YaPay.ButtonWidth.Auto,
        });
      })
      .catch((err: any) => {
        console.error('Failed to create payment session:', err);
        setError('Не удалось создать платёжную сессию');
      });
  }, [isLoaded, merchantId, amount, orderId, items, buttonType, theme, onSuccess, onError, onAbort]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
        {error}
      </div>
    );
  }

  return <div id={`yandex-pay-button-${orderId}`} className="yandex-pay-button" />;
}
