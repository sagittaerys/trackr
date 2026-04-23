import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'
import { Transaction } from '../types'
import { CATEGORIES } from '../constants/categories'
import { formatCurrency } from './currency'
import { format } from 'date-fns'

export async function exportCSV(
  transactions: Transaction[],
  currencySymbol: string
): Promise<void> {
  const headers = 'Date,Type,Category,Note,Amount\n'
  const rows = transactions.map((t) => {
    const date = format(new Date(t.date), 'MM/dd/yyyy')
    const category = CATEGORIES[t.category]?.label ?? t.category
    const amount = formatCurrency(t.amount, currencySymbol)
    return `${date},${t.type},${category},"${t.note}",${amount}`
  }).join('\n')

  const csv = headers + rows
  const filename = `trackr_export_${format(new Date(), 'yyyyMMdd')}.csv`

  await Print.printToFileAsync({
    html: `<pre>${csv}</pre>`,
    base64: false,
  }).then(async ({ uri }) => {
    await Sharing.shareAsync(uri, {
      mimeType: 'text/csv',
      dialogTitle: 'Export Transactions',
      UTI: 'public.comma-separated-values-text',
    })
  })
}

export async function exportPDF(
  transactions: Transaction[],
  currencySymbol: string,
  balance: number,
  totalIncome: number,
  totalExpenses: number
): Promise<void> {
  const rows = transactions.map((t) => {
    const date = format(new Date(t.date), 'MMM d, yyyy')
    const category = CATEGORIES[t.category]?.label ?? t.category
    const amount = formatCurrency(t.amount, currencySymbol)
    const color = t.type === 'income' ? '#10B981' : '#EF4444'
    const sign = t.type === 'income' ? '+' : '-'
    return `
      <tr>
        <td>${date}</td>
        <td>${t.type}</td>
        <td>${category}</td>
        <td>${t.note || '-'}</td>
        <td style="color:${color};font-weight:700">${sign}${amount}</td>
      </tr>
    `
  }).join('')

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #111827; }
          h1 { color: #1B3FA0; font-size: 28px; margin-bottom: 4px; }
          .subtitle { color: #6B7280; font-size: 13px; margin-bottom: 24px; }
          .summary { display: flex; gap: 16px; margin-bottom: 24px; }
          .summary-card { background: #F2F4F7; border-radius: 12px; padding: 16px; flex: 1; }
          .summary-label { font-size: 11px; color: #6B7280; text-transform: uppercase; letter-spacing: 1px; }
          .summary-value { font-size: 22px; font-weight: 800; margin-top: 4px; }
          table { width: 100%; border-collapse: collapse; }
          th { background: #1B3FA0; color: white; padding: 10px 12px; text-align: left; font-size: 12px; }
          td { padding: 10px 12px; border-bottom: 1px solid #F3F4F6; font-size: 13px; }
          tr:nth-child(even) td { background: #F9FAFB; }
        </style>
      </head>
      <body>
        <h1>Trackr</h1>
        <p class="subtitle">Financial Report — Generated ${format(new Date(), 'MMMM d, yyyy')}</p>
        <div class="summary">
          <div class="summary-card">
            <div class="summary-label">Balance</div>
            <div class="summary-value" style="color:#1B3FA0">${formatCurrency(balance, currencySymbol)}</div>
          </div>
          <div class="summary-card">
            <div class="summary-label">Income</div>
            <div class="summary-value" style="color:#10B981">+${formatCurrency(totalIncome, currencySymbol)}</div>
          </div>
          <div class="summary-card">
            <div class="summary-label">Expenses</div>
            <div class="summary-value" style="color:#EF4444">-${formatCurrency(totalExpenses, currencySymbol)}</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Note</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </body>
    </html>
  `

  const { uri } = await Print.printToFileAsync({ html })
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: 'Export PDF Report',
    UTI: 'com.adobe.pdf',
  })
}