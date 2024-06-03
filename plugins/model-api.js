import jobAPI from "./model-api/job-api";
import profileAPI from "./model-api/profile-api";


export default defineNuxtPlugin(() => {
  const { $moment, $filters, $_ } = useNuxtApp();
  const appConfig = useAppConfig();
  return {
    provide: {
      modelAPI: {
        jobAPI:jobAPI(appConfig,$moment, $filters, $_),
        profileAPI:profileAPI(appConfig,$moment, $filters, $_)
      },
    }
  }
});