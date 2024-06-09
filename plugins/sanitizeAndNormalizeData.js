// plugins/sanitizeAndNormalizeData.js

export default defineNuxtPlugin(() => {
  /**
   * Hàm để loại bỏ các ký tự nguy hiểm từ một chuỗi.
   * @param {string} str - Chuỗi cần được kiểm tra và loại bỏ ký tự nguy hiểm.
   * @returns {string} - Chuỗi đã được làm sạch.
   */
  function sanitizeString(str) {
    return str
      .replace(/[<>&"']/g, "") // Loại bỏ các ký tự <, >, &, ", '
      .replace(/\(/g, "") // Loại bỏ ký tự (
      .replace(/\)/g, "") // Loại bỏ ký tự )
      .replace(/;/g, "") // Loại bỏ ký tự ;
      .replace(/=/g, ""); // Loại bỏ ký tự =
  }

  /**
   * Hàm để chuẩn hóa dữ liệu truyền lên server.
   * @param {Object|Array} data - Dữ liệu cần được chuẩn hóa (có thể là object hoặc array).
   * @returns {Object|Array} - Dữ liệu đã được chuẩn hóa.
   */
  function sanitizeData(data) {
    if (typeof data === "string") {
      return sanitizeString(data);
    }

    if (Array.isArray(data)) {
      return data.map((item) => sanitizeData(item));
    }

    if (typeof data === "object" && data !== null) {
      const sanitizedObject = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          sanitizedObject[key] = sanitizeData(data[key]);
        }
      }
      return sanitizedObject;
    }

    return data;
  }
  return {
    provide: {
      sanitizeData: sanitizeData,
    },
  };
});
