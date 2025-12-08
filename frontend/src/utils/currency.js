export const formatVND = (value) => {
  if (value === null || value === undefined || value === '') return ''
  const number = Number(value)
  if (!Number.isFinite(number)) return ''
  try {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(number)
  } catch {
    return `${number.toLocaleString('vi-VN')} ₫`
  }
}

export default formatVND

