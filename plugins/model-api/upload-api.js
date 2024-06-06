export default (appConfig, $moment, $filters, $_) => {
    const { token, logout, userId } = useAuth();
    const uploadLocal = async  (image,filter,option = {}) => {
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
        return await useFetch(`http://localhost:2024/api/files/upload`, fetchOption);
      };
      return {
        uploadLocal,
      };
}