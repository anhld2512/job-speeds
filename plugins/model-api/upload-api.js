export default (appConfig, $moment, $filters, $_) => {
    const { token, logout, userId } = useAuth();
    const uploadLocal = async  (image,option = {}) => {
        const formData = new FormData();
        formData.append("file", image)
        //Merge options.
        const fetchOption = {
          ...option,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        return await useFetch(`${appConfig.apiURL.API}/api/files/upload`, fetchOption);
      };
      return {
        uploadLocal,
      };
}