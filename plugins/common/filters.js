import moment from "moment"
import 'moment/dist/locale/vi';

/**
 * .
 * Format date string.
 * @param {String} dateString - Required
 * @param {String} format - Optional
 * @param {String} lang - Optional
 * @returns {String}
 */
export const job-speed-tringFormat = (dateString, format = 'YYYY-MM-DD', lang = null) => {
  if (!dateString) {
    return;
  }

  const date = moment(dateString);
  if (!date.isValid()) return null;

  if (!!lang) {
    date.locale(lang)
    return date.format(format);
  }

  return date.format(format);
};

/**
 *  2022-06-18.
 * Convert TextArea to HTML.
 * @param {String} content - Required
 * @returns {String} HTML Content
 */
export const textAreaToHtml = (content) => {
  return `${content || ''}`.replace(/(?:\\[rn]|[\r\n]+)+/g, "<br/>");
}

/**
 *  2022-06-18.
 * Convert HTML to TextArea.
 * @param {String} content - Required
 * @returns {String} TextArea Content
 */
export const htmlToTextArea = (content) => {
  return `${content || ''}`.replace(/<br\s*[\/]?>/g, "\n");
}

/**
 *  2024-02-23.
 * Convert HTML to PlainText
 * @param {String} content - Required
 * @returns {String} PlainText Content
 */
export const htmlToPlainText = (text) => {
  //Dùng element temp để parse Html thành Content
  let el = document.createElement("div");

  if (text && typeof text === 'string') {
    // strip script/html tags
    text = text.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
    text = text.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
    el.innerHTML = text;
    text = el.textContent;
    el.textContent = '';
  }

  return text;
}

/**
 *  2022-07-05.
 * Decode specification character
 * @param {String} content - Required
 * @returns {String} decode Content
 */
export const decodeSpecCharSQLBuilder = (content) => {
  return `${content || ''}`.replace(/\$22\$/g, '"');
}

/**
 *  2022-07-05.
 * Encode specification character
 * @param {String} content - Required
 * @returns {String} encode Content
 */
export const encodeSpecCharSQLBuilder = (content) => {
  return `${content || ''}`.replace(/"/g, '$22$');
}

/**
 *  2022-01-04.
 * Convert Array to Text with separator.
 * @param {Array} array - Required
 * @param {String} separator - Required
 * @returns {String}
 */
export const arrayToText = (array, separator = ',') => {
  //Valid Input
  if (!Array.isArray(array)) return array;

  return array.join(separator);
}

/**
 *  2023-06-14.
 * Convert string from snake case to camel case.
 * @param {String} text - Required
 * @returns {String}
 */
export const snakeToCamelCase = (text) => {
  return (text || '').replace(/([-_]\w)/g, g => g[1].toUpperCase()).trim()
}

/**
 *  2023-06-14.
 * Convert string from snake case to pascal case.
 * @param {String} text - Required
 * @returns {String}
 */
export const snakeToPascalCase = (text) => {
  const camelCase = snakeToCamelCase(text);
  if (camelCase.length < 1) return camelCase;

  return `${camelCase[0].toUpperCase()}${camelCase.length > 1 ? camelCase.substring(1) : ""}`;
}

/**
 *  2022-01-05.
 * Add Space before every uppercase character.
 * @param {String} text - Required
 * @returns {String}
 */
export const spaceBeforeUppercaseChar = (text) => {
  return (text || '').replace(/([A-Z])/g, ' $1').trim()
}

/**
 *  2022-04-06.
 * Capitalize the first letter of each word from a string.
 * @param {String} text - Required
 * @returns {String}
 */
export const capitalizeFirstLetterAfterSpace = (text) => {
  return (text || '').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

/**
 *  2023-04-20.
 * Get value and vi currency from money.
 * @param {Number} money Required
 * @param {Number} decimals Optional
 * @returns {ViCurrency}
 */
export const getViCurrency = (money, decimals = 2) => {
  let viCurrency = {
    value: 0,
    currency: "đồng"
  }

  if (!typeof money === "number") return viCurrency

  const roundDecimals = 10 ** (+(decimals || 0));
  const moneyAbs = Math.abs(money);
  let rate = 10 ** (-(decimals || 0));
  if (moneyAbs >= 1000000000) {
    rate = 1000000000 / roundDecimals;
    viCurrency.currency = "tỷ";
  } else if (moneyAbs >= 1000000) {
    rate = 1000000 / roundDecimals;
    viCurrency.currency = "triệu";
  } else if (moneyAbs >= 1000) {
    rate = 1000 / roundDecimals;
    viCurrency.currency = "ngàn";
  }

  viCurrency.value = Math.round(money / rate) / roundDecimals;

  return viCurrency
}

/**
 *  2023-05-24.
 * Convert Money Currency.
 * @param {Number} money - Required
 * @param {String} targetCurrency - Required. Default: "đồng"
 * @param {String} currentCurrency - Optional. Default: "đồng"
 * @returns {Number}
 */
export const convertMoneyViCurrency = (money, targetCurrency, currentCurrency) => {
  let curMoney = money;
  const currentCurrencyLowerCase = `${currentCurrency || ""}`.toLowerCase();
  const targetCurrencyLowerCase = `${targetCurrency || ""}`.toLowerCase();

  //Convert Current Currency to "đồng".
  switch (currentCurrencyLowerCase) {
    case "tỷ":
      curMoney = curMoney * 1000000000;
      break;
    case "triệu":
      curMoney = curMoney * 1000000;
      break;
    case "ngàn":
      curMoney = curMoney * 1000;
      break;
  }

  //Convert money to target Currency.
  switch (targetCurrencyLowerCase) {
    case "tỷ":
      curMoney = curMoney / 1000000000;
      break;
    case "triệu":
      curMoney = curMoney / 1000000;
      break;
    case "ngàn":
      curMoney = curMoney / 1000;
      break;
  }

  return curMoney
}

/**
 *  2023-05-24.
 * Rounds a number to a specified number of decimal places.
 * @param {Number} number - Required
 * @param {Number} decimals - Required
 * @returns {Number}
 */
export const numberRound = (number, decimals) => {
  return Math.round(+(number || 0) * 10 ** (+(decimals || 0))) / (10 ** (+(decimals || 0)));
}

/**
 *  2023-04-27.
 * Show Error Display.
 * @param {String} errMessage Required
 * @returns {String}
 */
export const showErrorDisplay = (errMessage) => {
  return (errMessage || "").startsWith('Permission Denied') ? errMessage : "Error";
}

/**
 *  2023-10-12.
 * Check value is null or empty.
 * @param {*} value Required
 * @returns {Boolean}
 */
export const isNullOrEmpty = (value) => {
  return typeof (value) === "undefined" ||
    value === null ||
    value === "undefined" ||
    (typeof value === "string" && value.trim() === "") ||
    (typeof value === "object" && Object.entries(value).length === 0) ||
    (Array.isArray(value) && value.length === 0)
}

/**
 *  2024-04-23.
 * Check phone value is number and minlength = 10.
 * @param {String} value Required
 * @returns {Boolean}
 */
export const isValidPhoneNumber = (value) => {
  const regex = /[0-9]{10,}$/;
  return regex.test(`${value || ""}`.trim());
}

/**
 *  2024-04-29.
 * Rename file when duplicated.
 * @param {Array<String>} names Required
 * @param {String} currentName Required
 * @returns {String}
 */
export const getUniqueFileName = (names, currentName) => {
  let newName = `${currentName || ""}`.trim();

  //Valid Input
  if (!(Array.isArray(names) && names.length > 0 && newName.length)) return currentName;
  //Cắt FileName và FileExtension.
  const nameSplit = `${currentName || ""}`.trim().split(".");

  //Thêm số đếm vào sau fileName cho đến khi không còn trùng
  let count = 1;
  while (names.some(n => `${n || ""}`.trim().toLowerCase() === `${newName}`.toLowerCase())) {
    if (nameSplit.length > 1) {
      newName = `${nameSplit[nameSplit.length - 2]}(${count}).${nameSplit[nameSplit.length - 1]}`;
    } else {
      newName = `${nameSplit[0]}(${count})`;
    }

    count++;
  }

  return newName;
}

/**
 *  2024-04-29.
 * Convert Bytes number to Size string.
 * @param {Number} bytes Required
 * @param {Array<String>} sizes Optional. default: ["B", "KB", "MB", "GB", "TB"]
 * @returns {String} size
 */
export const convertBytesToSize = (bytes, sizes) => {
  const sizeList = (Array.isArray(sizes) && sizes.length) ? [...sizes] : ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  if (Number.isNaN(+bytes) || (+bytes) <= 0) {
    return '0 B';
  }

  while (bytes > 999 && i < sizeList.length - 1) {
    bytes = bytes / 1024;
    i++;
  }

  return Math.max(bytes, 0).toFixed(2) + ' ' + sizeList[i];
}

/**
 *  2024-05-02.
 * Convert to absolute url.
 * @param {String} url Required
 * @returns {String}
 */
export const absoluteUrl = (url) => {
  if (`${url || ""}`.startsWith("http:") || `${url || ""}`.startsWith("https:")) {
    return url;
  }

  return `//${url}`;
}

/**
 *  2024-05-02.
 * @param {String} value Required
 * @returns {Boolean}
 */
export const isValidURL = (value) => {
  const pattern = new RegExp(
    '^([a-zA-Z]+:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(value);
}

export default {
  dateStringFormat,
  textAreaToHtml,
  htmlToTextArea,
  htmlToPlainText,
  decodeSpecCharSQLBuilder,
  encodeSpecCharSQLBuilder,
  arrayToText,
  snakeToCamelCase,
  snakeToPascalCase,
  spaceBeforeUppercaseChar,
  capitalizeFirstLetterAfterSpace,
  getViCurrency,
  convertMoneyViCurrency,
  numberRound,
  showErrorDisplay,
  isNullOrEmpty,
  isValidPhoneNumber,
  getUniqueFileName,
  convertBytesToSize,
  absoluteUrl,
  isValidURL
}