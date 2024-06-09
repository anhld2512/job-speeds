export default (appConfig, $moment, $filters, $_) => {
  const { token, logout, userId } = useAuth();
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
  /**
   *Author: AnhLD
   *Date: 2024-06-09
   * Function description
   *
   * @param {*} applyData
   * @param {*} [option={}]
   * @return {*}
   */
  const createApply = async (applyData, option = {}) => {
    // Sanitize and normalize data
    const fetchOption = {
      ...option,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sanitizeData(applyData)),
    };

    return await useFetch(
      `${appConfig.apiURL.API}/api/applications`,
      fetchOption
    );
  };

  // Get an application by ID

  /**
   *Author: AnhLD
   *Date: 2024-06-09
   * Function description
   *
   * @param {*} applyId
   * @param {*} [option={}]
   * @return {*}
   */
  const getApplyById = async (applyId, option = {}) => {
    const fetchOption = {
      ...option,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return await useFetch(
      `${appConfig.apiURL.API}/api/applications/${applyId}`,
      fetchOption
    );
  };

  // Update an application
  /**
   *Author: AnhLD
   *Date: 2024-06-09
   * Function description
   *
   * @param {*} applyId
   * @param {*} updateData
   * @param {*} [option={}]
   * @return {*}
   */
  const updateApply = async (applyId, updateData, option = {}) => {
    // Sanitize and normalize data
    updateData = updateData;

    const fetchOption = {
      ...option,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sanitizeData(updateData)),
    };

    return await useFetch(
      `${appConfig.apiURL.API}/api/applications/${applyId}`,
      fetchOption
    );
  };

  // Delete an application
  /**
   *Author: AnhLD
   *Date: 2024-06-09
   * Function description
   *
   * @param {*} applyId
   * @param {*} [option={}]
   * @return {*}
   */
  const deleteApply = async (applyId, option = {}) => {
    const fetchOption = {
      ...option,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return await useFetch(
      `${appConfig.apiURL.API}/api/applications/${applyId}`,
      fetchOption
    );
  };

  // Filter applications
  /**
   *Author: AnhLD
   *Date: 2024-06-09
   * Function description
   *
   * @param {*} filterCriteria
   * @param {*} [option={}]
   * @return {*}
   */
  const filterApply = async (filterCriteria, option = {}) => {
    const queryString = new URLSearchParams(filterCriteria).toString();
    const fetchOption = {
      ...option,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return await useFetch(
      `${appConfig.apiURL.API}/api/applications?${queryString}`,
      fetchOption
    );
  };

  return {
    createApply,
    getApplyById,
    updateApply,
    deleteApply,
    filterApply,
  };
};
