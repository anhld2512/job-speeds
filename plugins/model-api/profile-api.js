export default (appConfig, $moment, $filters, $_) => {
  let token = "";

  if (process.client) {
    token = localStorage.getItem("token");
  }
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
   * @param {*} item
   * @return {*}
   */
  const profileFormat = (item) => {
    //Valid Input.
    if (!(item && typeof item === "object")) return null;
    return {
      ...item,
      personalInfo: {
        ...item.personalInfo,
        dateOfBirth: !!item.personalInfo.dateOfBirth
          ? $moment(item.personalInfo.dateOfBirth).format("YYYY-MM-DD")
          : null,
      },
    };
  };
  /**
   *Author: AnhLD
   *Date: 2024-06-09
   * Function description
   *
   * @param {*} userId
   * @param {*} [option={}]
   * @return {*}
   */
  const getProfileById = async (userId, token, option = {}) => {
    //Merge options.
    const fetchOption = {
      ...option,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await useFetch(
      `${appConfig.apiURL.API}/api/profiles/${userId}`,
      fetchOption
    );
  };
  /**
   *Author: AnhLD
   *Date: 2024-06-09
   * Function description
   *
   * @param {*} profileId
   * @param {*} data
   * @param {*} [option={}]
   * @return {*}
   */
  const updateProfile = async (profileId, data, option = {}) => {
    //Merge options.
    const fetchOption = {
      ...option,
      method: "PUT",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await useFetch(
      `${appConfig.apiURL.API}/api/profiles/${profileId}`,
      fetchOption
    );
  };
  return {
    profileFormat,
    getProfileById,
    updateProfile,
  };
};
