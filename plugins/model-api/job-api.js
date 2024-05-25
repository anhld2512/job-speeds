export default ({ appConfig, $moment, $filters, $_ }) => {
    const getListJob = async (option = {}) => {
        //Merge options.
        const fetchOption = {
          ...option,
          method: 'GET',
        };
        return await useFetch(`https://api.jobspeeds.com/file/lists`, fetchOption);
      }
      return {
        getListJob,
      };
}