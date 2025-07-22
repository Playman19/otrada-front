export function isRealNumber(value) {
  if (value === null || value === undefined) return false
  return !isNaN(Number(value))
}

// 2. Проверяет, что строка по длине находится в диапазоне [minLength, maxLength]
export function isStringLengthBetween(value, minLength, maxLength) {
  if (typeof value !== 'string') return false
  const len = value.length
  return len >= minLength && len <= maxLength
}

// 3. Проверяет, что строка содержит минимум один английский символ, цифру и спецсимвол
export function hasEnglishLetterDigitSymbol(value) {
  if (typeof value !== 'string') return false
  const englishLetter = /[A-Za-z]/
  const digit = /\d/
  // Спецсимволы считаем любые символы, не входящие в буквы или цифры (например !@#$%^&* и т.п.)
  const symbol = /[^A-Za-z0-9]/

  return englishLetter.test(value) && digit.test(value) && symbol.test(value)
}
