export default (appConfig, $moment, $filters, $_) => {
  const { token, logout, userId } = useAuth();
  const createJob = async (job,option = {}) =>{
    const sanitizedJob = sanitizeJobData(job);
    const fetchOption = {
      ...option,
      method: "POST",
      body: JSON.stringify(sanitizedJob),
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return await useFetch(`${appConfig.apiURL.API}/api/jobs`, fetchOption);
  }
  const getJobById = async (id,option = {}) =>{
    const fetchOption = {
      ...option,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return await useFetch(`${appConfig.apiURL.API}/api/jobs/${id}`, fetchOption);
  }
  const updateJobById = async (id,job,option = {}) =>{
    const sanitizedJob = sanitizeJobData(job);
    const fetchOption = {
      ...option,
      method: "PUT",
      body:JSON.stringify(sanitizedJob),
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return await useFetch(`${appConfig.apiURL.API}/api/jobs/${id}`, fetchOption);
  }
  const filterJob = async  (itemInPage,filter,option = {}) => {
    //Merge options.
    const fetchOption = {
      ...option,
      method: "POST",
      body:{
        data:filter,
        skip:itemInPage
      },
    
    };
    return await useFetch(`${appConfig.apiURL.API}/api/jobs/filter`, fetchOption);
  };
  const deleteJob = async (itemId,option = {})=>{
      //Merge options.
    const fetchOption = {
      ...option,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return await useFetch(`${appConfig.apiURL.API}/api/jobs/${itemId}`, fetchOption);
  }
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
        if (typeof text === 'string') {
            // Trim and escape HTML
            return escapeHtml(text.trim());
        }
        return text;
    };

    const sanitizedJob = { ...job };

    // List of fields to sanitize
    const textFields = ['jobName', 'jobDescription', 'Responsibilities', 'Requirements'];

    textFields.forEach(field => {
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
    updateJobById
  };
};
