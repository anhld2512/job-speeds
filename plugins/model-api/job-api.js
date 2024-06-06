export default (appConfig, $moment, $filters, $_) => {
  const getJobById = async (id,option = {}) =>{
    const fetchOption = {
      ...option,
      method: "GET",
    };
    return await useFetch(`http://localhost:2024/api/jobs/${id}`, fetchOption);
  }
  const filterJob = async  (itemInPage,filter,option = {}) => {
    //Merge options.
    const fetchOption = {
      ...option,
      method: "POST",
      body:{
        data:filter,
        skip:itemInPage
      }
    };
    return await useFetch(`http://localhost:2024/api/jobs/filter`, fetchOption);
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
    filterJob,
    deleteJob,
    getJobById
  };
};
