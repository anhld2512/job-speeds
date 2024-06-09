export default (appConfig, $moment, $filters, $_) => {
    const { token, logout, userId } = useAuth();
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
      if (!(item && typeof item === 'object')) return null;
      return {
        ...item,
        personalInfo:{
          ...item.personalInfo,
          dateOfBirth:!!item.personalInfo.dateOfBirth ? $moment(item.personalInfo.dateOfBirth).format("YYYY-MM-DD") : null,
        }
      }
    }
    /**
     *Author: AnhLD
     *Date: 2024-06-09
     * Function description
     *
     * @param {*} userId
     * @param {*} [option={}]
     * @return {*} 
     */
    const getProfileById = async  (userId,option = {}) => {
      //Merge options.
      const fetchOption = {
        ...option,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      return await useFetch(`${appConfig.apiURL.API}/api/profiles/${userId}`, fetchOption);
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
    const updateProfile = async  (profileId,data,option = {}) => {
      //Merge options.
      const fetchOption = {
        ...option,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      return await useFetch(`${appConfig.apiURL.API}/api/profiles/${profileId}`, fetchOption);
    };
    return {
      profileFormat,
      getProfileById,
      updateProfile
    };
  };
  