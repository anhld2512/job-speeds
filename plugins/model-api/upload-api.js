export default (appConfig, $moment, $filters, $_) => {
    const { token, logout, userId } = useAuth();
    const uploadLocal = async  (image,filter,option = {}) => {
        const formData = new FormData();
        formData.append("image", image)
        //Merge options.
        const fetchOption = {
          ...option,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        return await useFetch(`https://api.jobspeeds.com/file-manager/uploads`, fetchOption);
      };
      return {
        uploadLocal,
      };
}