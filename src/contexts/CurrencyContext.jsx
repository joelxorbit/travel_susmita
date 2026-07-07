import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

const EXCHANGE_RATES = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  JPY: { symbol: '¥', rate: 155.0 },
  INR: { symbol: '₹', rate: 83.5 }
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    try {
      return localStorage.getItem('wanderluxe_currency') || 'USD';
    } catch (e) {
      return 'USD';
    }
  });

  const changeCurrency = (code) => {
    if (EXCHANGE_RATES[code]) {
      setCurrency(code);
      try {
        localStorage.setItem('wanderluxe_currency', code);
      } catch (e) {}
    }
  };

  const formatPrice = (amountInUSD) => {
    const num = Number(amountInUSD) || 0;
    const { symbol, rate } = EXCHANGE_RATES[currency] || EXCHANGE_RATES.USD;
    const converted = num * rate;
    
    if (currency === 'JPY' || currency === 'INR') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, formatPrice, rates: EXCHANGE_RATES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
