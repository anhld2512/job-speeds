export default (appConfig, $moment, $filters, $_) => {
  const getListJob = async  (item,option = {}) => {
    //Merge options.
    const fetchOption = {
      ...option,
      method: "GET",
    };
    return await useFetch(`${appConfig.apiURL.API}/job`, fetchOption);
  };
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
    return await useFetch(`${appConfig.apiURL.API}/job/filter`, fetchOption);
  };
  return {
    getListJob,
    filterJob
  };
};
