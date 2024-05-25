import jobAPI from "./model-api/job-api";


export default defineNuxtPlugin(() => {
  const { $moment, $filters, $_ } = useNuxtApp();
  const appConfig = useAppConfig();
  return {
    provide: {
      modelAPI: {
        jobAPI:jobAPI(appConfig,$moment, $filters, $_)
      },
    }
  }
});