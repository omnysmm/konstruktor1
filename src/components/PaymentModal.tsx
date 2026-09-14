import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amount: string;
  period: string;
  features: string[];
  templateName?: string;
  templatePrice?: string;
}

type PaymentMethod = 'yandex-pay' | 'card' | 'sbp' | 'apple-pay' | 'google-pay' | 'crypto';
type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';
type PurchaseType = 'subscription' | 'template';

export function PaymentModal({ isOpen, onClose, planName, amount, period, features, templateName, templatePrice }: PaymentModalProps) {
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('subscription');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('yandex-pay');
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [phone, setPhone] = useState('');

  const currentAmount = purchaseType === 'subscription' ? amount : (templatePrice || '990');
  const currentPeriod = purchaseType === 'subscription' ? period : '';
  const currentName = purchaseType === 'subscription' ? planName : (templateName || 'Шаблон');

  const handlePayment = () => {
    setStatus('processing');
    
    // Имитация процесса оплаты (в реальном приложении здесь будет API вызов)
    setTimeout(() => {
      if (paymentMethod === 'yandex-pay') {
        // Yandex Pay обрабатывается через SDK
        setStatus('success');
      } else if (paymentMethod === 'card') {
        // Проверка данных карты
        if (cardData.number.length < 16 || !cardData.expiry || !cardData.cvv) {
          setStatus('error');
          return;
        }
        setStatus('success');
      } else if (paymentMethod === 'sbp') {
        // СБП - оплата по QR
        setStatus('success');
      }
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {purchaseType === 'subscription' ? 'Оплата подписки' : 'Покупка шаблона'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {purchaseType === 'subscription' ? `Тариф: ${planName}` : `Шаблон: ${templateName}`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          {/* Purchase Type Toggle */}
          {templateName && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setPurchaseType('subscription')}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  purchaseType === 'subscription'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💎 Подписка
              </button>
              <button
                onClick={() => setPurchaseType('template')}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  purchaseType === 'template'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🛒 Купить шаблон
              </button>
            </div>
          )}
        </div>

        {status === 'idle' && (
          <>
            {/* Order Summary */}
            <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-900">{currentName}</span>
                <span className="text-2xl font-bold text-indigo-600">
                  {currentAmount}<span className="text-sm font-normal text-gray-500">{currentPeriod}</span>
                </span>
              </div>
              <div className="space-y-1">
                {purchaseType === 'subscription' ? (
                  <>
                    {features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span>
                        {f}
                      </div>
                    ))}
                    {features.length > 3 && (
                      <div className="text-sm text-gray-400">+{features.length - 3} других преимуществ</div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span>
                      Полный доступ к шаблону
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span>
                      Все секции и компоненты
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span>
                      Бесплатные обновления
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span>
                      Коммерческое использование
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Способ оплаты</h3>
              <div className="space-y-3">
                {/* Yandex Pay */}
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'yandex-pay'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'yandex-pay'}
                    onChange={() => setPaymentMethod('yandex-pay')}
                    className="sr-only"
                  />
                  <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-xl">
                    💰
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Yandex Pay</div>
                    <div className="text-xs text-gray-500">Быстрая оплата через Яндекс</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'yandex-pay' ? 'border-indigo-500' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'yandex-pay' && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>}
                  </div>
                </label>

                {/* Card */}
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="sr-only"
                  />
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                    💳
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Банковская карта</div>
                    <div className="text-xs text-gray-500">Visa, Mastercard, МИР</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'card' ? 'border-indigo-500' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>}
                  </div>
                </label>

                {/* SBP */}
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'sbp'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'sbp'}
                    onChange={() => setPaymentMethod('sbp')}
                    className="sr-only"
                  />
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
                    📱
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">СБП (Система быстрых платежей)</div>
                    <div className="text-xs text-gray-500">Оплата по QR-коду через банк</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'sbp' ? 'border-indigo-500' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'sbp' && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>}
                  </div>
                </label>
              </div>

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Номер карты</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={cardData.number}
                      onChange={e => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                      maxLength={19}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Имя владельца</label>
                    <input
                      type="text"
                      placeholder="IVAN IVANOV"
                      value={cardData.name}
                      onChange={e => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Срок</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={e => {
                          let v = e.target.value.replace(/\D/g, '');
                          if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                          setCardData({ ...cardData, expiry: v });
                        }}
                        maxLength={5}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        value={cardData.cvv}
                        onChange={e => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                        maxLength={3}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SBP Form */}
              {paymentMethod === 'sbp' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Номер телефона</label>
                  <input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Мы отправим QR-код для оплаты в SMS
                  </p>
                </div>
              )}

              {/* Yandex Pay Info */}
              {paymentMethod === 'yandex-pay' && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Оплата через Yandex Pay</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Нажмите кнопку «Оплатить» ниже для авторизации через Яндекс. 
                        Оплата пройдёт безопасно через платёжную систему Yandex Pay.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <div className="p-6 border-t border-gray-100">
              <button
                onClick={handlePayment}
                className={`w-full py-4 rounded-xl font-semibold text-white text-lg transition-all shadow-lg hover:shadow-xl ${
                  paymentMethod === 'yandex-pay'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                }`}
              >
                {paymentMethod === 'yandex-pay' ? '💰 Оплатить через Yandex Pay' : 'Оплатить ' + amount + period}
              </button>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                <span>🔒 Безопасная оплата</span>
                <span>•</span>
                <span>SSL шифрование</span>
                <span>•</span>
                <span>PCI DSS</span>
              </div>
            </div>
          </>
        )}

        {/* Processing */}
        {status === 'processing' && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Обработка платежа...</h3>
            <p className="text-sm text-gray-500">Пожалуйста, не закрывайте окно</p>
          </div>
        )}

        {/* Success */}
        {status === 'success' && (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Оплата прошла успешно!</h3>
            <p className="text-gray-500 mb-6">
              Тариф <strong>{planName}</strong> активирован. Чек отправлен на вашу почту.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Номер заказа</span>
                <span className="font-mono text-gray-900">#{Date.now().toString(36).toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Сумма</span>
                <span className="font-semibold text-gray-900">{amount}{period}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Способ оплаты</span>
                <span className="text-gray-900">
                  {paymentMethod === 'yandex-pay' ? 'Yandex Pay' : paymentMethod === 'card' ? 'Банковская карта' : 'СБП'}
                </span>
              </div>
            </div>
            <button
              onClick={() => { setStatus('idle'); onClose(); }}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Отлично!
            </button>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">❌</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ошибка оплаты</h3>
            <p className="text-gray-500 mb-6">
              Не удалось обработать платёж. Проверьте данные и попробуйте снова.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Попробовать снова
              </button>
              <button
                onClick={() => { setStatus('idle'); onClose(); }}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
