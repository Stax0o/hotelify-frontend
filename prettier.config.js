export default {
  printWidth: 100,          // Максимальная длина строки (обычно 80 или 100)
  tabWidth: 2,              // Отступ в 2 пробела (стандарт для JavaScript и React)
  useTabs: false,           // Использовать пробелы вместо табов
  semi: true,               // Всегда ставить точки с запятой
  singleQuote: true,        // Использовать одинарные кавычки (лучше читаемость)
  trailingComma: 'all',     // Висячие запятые везде (лучше для git-диффов)
  bracketSpacing: true,     // Пробелы внутри `{ объект }`
  jsxSingleQuote: false,    // Двойные кавычки в JSX (`<Component prop="value" />`)
  arrowParens: 'always',    // Всегда ставить скобки у стрелочных функций
  endOfLine: 'lf',          // Унифицировать перенос строк (LF)
  bracketSameLine: false  // Закрывающий `>` на новой строке в JSX
};