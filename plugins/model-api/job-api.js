export default (appConfig, $moment, $filters, $_) => {
  const { token, logout, userId } = useAuth();
  /**
   *Author: AnhLD
   *Date: 2024-06-09
   * Function description
   *
   * @param {*} job
   * @param {*} [option={}]
   * @return {*}
   */
  const createJob = async (job, option = {}) => {
    const sanitizedJob = sanitizeJobData(job);
    const fetchOption = {
      ...option,
      method: "POST",
      body: JSON.stringify(sanitizedJob),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await useFetch(`${appConfig.apiURL.API}/api/jobs`, fetchOption);
  };
  /**
   *Author: AnhLD
   *Date: 2024-06-09
   * Function description
   *
   * @param {*} id
   * @param {*} [option={}]
   * @return {*}
   */
  const getJobById = async (id, option = {}) => {
    const fetchOption = {
      ...option,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await useFetch(
      `${appConfig.apiURL.API}/api/jobs/${id}`,
      fetchOption
    );
  };
  /**
   *Author: AnhLD
   *Date: 2024-06-09
   * Function description
   *
   * @param {*} id
   * @param {*} job
   * @param {*} [option={}]
   * @return {*}
   */
  const updateJobById = async (id, job, option = {}) => {
    const sanitizedJob = sanitizeJobData(job);
    const fetchOption = {
      ...option,
      method: "PUT",
      body: JSON.stringify(sanitizedJob),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await useFetch(
      `${appConfig.apiURL.API}/api/jobs/${id}`,
      fetchOption
    );
  };
  /**
   *Author: AnhLD
   *Date: 2024-06-09
   * Function description
   *
   * @param {*} itemInPage
   * @param {*} filter
   * @param {*} [option={}]
   * @return {*}
   */
  const filterJob = async (itemInPage, filter, option = {}) => {
    //Merge options.
    const fetchOption = {
      ...option,
      method: "POST",
      body: {
        data: filter,
        skip: itemInPage,
      },
    };
    return await useFetch(
      `${appConfig.apiURL.API}/api/jobs/filter`,
      fetchOption
    );
  };
  /**
   *Author: AnhLD
   *Date: 2024-06-09
   * Function description
   *
   * @param {*} itemId
   * @param {*} [option={}]
   * @return {*}
   */
  const deleteJob = async (itemId, option = {}) => {
    //Merge options.
    const fetchOption = {
      ...option,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await useFetch(
      `${appConfig.apiURL.API}/api/jobs/${itemId}`,
      fetchOption
    );
  };
  const getDistinctValues = async (nameField, option = {}) => {
    // Merge options
    const fetchOption = {
        ...option,
        method: "GET",
    };

    // Construct the API URL with the nameField parameter
    return await useFetch(
        `${appConfig.apiURL.API}/api/jobs/distinct?field=${encodeURIComponent(nameField)}`,
        fetchOption
    );
};

  /**
   *Author: AnhLD
   *Date: 2024-06-09
   * Function description
   *
   * @param {*} job
   * @return {*}
   */
  function sanitizeJobData(job) {
    const escapeHtml = (unsafe) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const sanitizeText = (text) => {
      if (typeof text === "string") {
        // Trim and escape HTML
        return escapeHtml(text.trim());
      }
      return text;
    };

    const sanitizedJob = { ...job };

    // List of fields to sanitize
    const textFields = [
      "jobName",
      "jobDescription",
      "Responsibilities",
      "Requirements",
    ];

    textFields.forEach((field) => {
      if (sanitizedJob[field]) {
        sanitizedJob[field] = sanitizeText(sanitizedJob[field]);
      }
    });

    return sanitizedJob;
  }
  return {
    createJob,
    filterJob,
    deleteJob,
    getJobById,
    updateJobById,
    getDistinctValues,
  };
};
