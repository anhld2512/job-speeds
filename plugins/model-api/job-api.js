export default (appConfig, $moment, $filters, $_) => {
  const getListJob = async  (item,option = {}) => {
    //Merge options.
    const fetchOption = {
      ...option,
      method: "GET",
    };
    return await useFetch(`https://api.jobspeeds.com/job`, fetchOption);
  };
  const getJobById = async (id,option = {}) =>{
    const fetchOption = {
      ...option,
      method: "GET",
    };
    return await useFetch(`https://api.jobspeeds.com/job/${id}`, fetchOption);
  }
  const filterJob = async  (itemInPage,filter,option = {}) => {
    //Merge options.
    const fetchOption = {
      ...option,
      method: "POST",
      body:{
        filter:filter,
        skip:itemInPage
      }
    };
    return await useFetch(`https://api.jobspeeds.com/job/filter`, fetchOption);
  };
  const deleteJob = async (itemId,option = {})=>{
      //Merge options.
    const fetchOption = {
      ...option,
      method: "POST",
      body:{
        id:itemId
      }
    };
    return await useFetch(`https://api.jobspeeds.com/job/delete`, fetchOption);
  }
  return {
    getListJob,
    filterJob,
    deleteJob,
    getJobById
  };
};
