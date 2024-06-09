import jobAPI from "./model-api/job-api";
import profileAPI from "./model-api/profile-api";
import uploadAPI from "./model-api/upload-api";
import applyAPI from "./model-api/apply-api";
export default defineNuxtPlugin(() => {
  const { $moment, $filters, $_ } = useNuxtApp();
  const appConfig = useAppConfig();
  return {
    provide: {
      modelAPI: {
        jobAPI:jobAPI(appConfig,$moment, $filters, $_),
        profileAPI:profileAPI(appConfig,$moment, $filters, $_),
        uploadAPI:uploadAPI(appConfig,$moment, $filters, $_),
        applyAPI:applyAPI(appConfig,$moment, $filters, $_)
      },
    }
  }
});