export default (appConfig, $moment, $filters, $_) => {
    const { token, logout, userId } = useAuth();
    /**
     *Author: AnhLD
     *Date: 2024-06-09
     * Function description
     *
     * @param {*} image
     * @param {*} [option={}]
     * @return {*} 
     */
    const uploadLocal = async  (image,option = {}) => {
        const formData = new FormData();
        formData.append("file", image)
        //Merge options.
        const fetchOption = {
          ...option,
          method: "POST",
          body: formData,
        };
        return await useFetch(`${appConfig.apiURL.API}/api/files/upload`, fetchOption);
      };
      return {
        uploadLocal,
      };
}