import { TABLE_ROW_HEIGHT } from 'app/constants'
import type { RefObject } from 'react'

export const generateMerchants = (count: number) => {
  const baseNames = [
    'WeChat Pay',
    'PayPal',
    'Stripe',
    'Apple Pay',
    'Google Pay',
    'Samsung Pay',
    'Amazon Pay',
    'Venmo',
    'Alipay',
    'Cash App',
    'Zelle',
    'Revolut',
    'Wise',
    'Klarna',
    'Afterpay',
    'Square',
    'Paysend',
    'Skrill',
    'Neteller',
    'Payoneer',
    'Remitly',
    'WorldRemit',
    'TransferGo',
    'Western Union',
    'MoneyGram',
    'Chipper Cash',
    'Flutterwave',
    'M-Pesa',
    'Orange Money',
    'Paytm',
    'PhonePe',
    'Razorpay',
    'YooMoney',
    'QIWI Wallet',
    'WebMoney',
    'Tinkoff Pay',
    'Monobank Pay',
    'Privat24',
    'Settle',
    'Twint',
    'Swish',
    'Barion',
    'Satispay',
    'Bolt Pay',
    'Glovo Pay',
    'Uber Pay',
    'Lyft Wallet',
    'GrabPay',
    'LINE Pay',
    'Naver Pay',
  ]

  const result = []

  for (let i = 1; i <= count; i++) {
    const transactions = Math.random() * 100
    const fail = Math.random() * 100
    const score = (transactions * fail) / 100
    const uniqueName = `${baseNames[(i - 1) % baseNames.length]}_${i}`

    result.push({
      id: i.toString(),
      name: uniqueName,
      transactions: transactions.toFixed(1),
      fail: fail.toFixed(1),
      score: score.toFixed(1),
    })
  }

  return result
}

export const getRefetchInterval = (refreshInterval: string) =>
  Number.isInteger(Number(refreshInterval)) ? Number(refreshInterval) : false

export const getVisibleTableRows = (ref: RefObject<HTMLDivElement | null>) =>
  ref.current ? Math.floor(ref.current.clientHeight / TABLE_ROW_HEIGHT + 1) : 0
