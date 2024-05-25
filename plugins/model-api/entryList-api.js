export default ({ appConfig, defaultStore }) => {
  const getListProvince = async () => {
    return await useFetch(
      `${appConfig.apiURL.TTT_internal}/public/db1/items/LOC_Province`,
      {
        query: {
          sort: "Name",
          "filter[_and][0][status][_eq]": "published"
        },
        headers: {
          authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`,
        }
      }
    );
  };
  const getJobTitle = async (id) => {
    if (!!id) {
      return await useFetch(
        `${appConfig.apiURL.TTT_internal}/public/db1/items/HRM_JobTitle`,
        {
          query: {
            limit: -1,
            sort: "EnglishName",
            "filter[_and][0][id][_eq]": id,
            "filter[_and][0][Recruiting][_eq]": true
          },
          headers: {
            authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`,
          }
        }
      );
    } else {
      return await useFetch(
        `${appConfig.apiURL.TTT_internal}/public/db1/items/HRM_JobTitle`,
        {
          query: {
            limit: -1,
            sort: "EnglishName",
            "filter[_and][0][status][_eq]": "published",
            "filter[_and][0][Recruiting][_eq]": true
          },
          headers: {
            authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`,
          }
        }
      );
    }
  };
  //#region Query
  /**
   *  2024-02-23.
   * Get Entries from db1 List.
   * @param {Array<String>|String} listName Required
   * @returns {Promise<Array<Entry>>} Promise<Array<Entry>>
   */
  const getEntries = async (listName) => {
    let listNames = [];
    //Set Param to listNames.
    if (Array.isArray(listName)) {
      listNames = [...listName];
    } else if (
      typeof listName === "string" &&
      `${listName || ""}`.trim().length > 0
    ) {
      listNames[listName];
    }

    if (listNames.length < 1) return [];
    const result = await useFetch(
      `${appConfig.apiURL.TTT_internal}/public/db1/items/HRM_Lists`,
      {
        query: {
          //Unlimited record
          limit: -1,
          //Sort SortOrder -> Text -> Value
          sort: "SortOrder,Text,Value",
          //Filter
          filter: JSON.stringify({
            status: { _eq: "published" },
            ListName: { _in: listNames },
          }),
        },
        headers: {
          authorization: `${defaultStore?.tokenType ?? ""} ${defaultStore?.msalToken ?? ""}`,
        }
      }
    );
    return result.data?.value?.data ?? [];
  }

  //#endregion
  return {
    getEntries,
    getListProvince,
    getJobTitle,
  }
}