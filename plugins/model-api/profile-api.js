export default (appConfig, $moment, $filters, $_) => {
    const getProfilById = async  (userId,option = {}) => {
      //Merge options.
      const fetchOption = {
        ...option,
        method: "GET",
      };
      return await useFetch(`${appConfig.apiURL.API}/profile/${userId}`, fetchOption);
    };
    const updateProfile = async  (profileId,data,option = {}) => {
      //Merge options.
      const fetchOption = {
        ...option,
        method: "PUT",
        body: data
      };
      return await useFetch(`${appConfig.apiURL.API}/profile/${profileId}`, fetchOption);
    };
    return {
      getProfilById,
      updateProfile
    };
  };
  