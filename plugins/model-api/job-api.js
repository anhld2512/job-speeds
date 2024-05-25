export default (appConfig, $moment, $filters, $_ ) => {
    const getListJob = async (option = {}) => {
        //Merge options.
        const fetchOption = {
          ...option,
          method: 'GET',
        };
        return await useFetch(`${appConfig.apiURL.API}/file-manager/list`, fetchOption);
      }
      return {
        getListJob,
      };
}