export const useDefaultStore = defineStore('default', () => {
  const appDivId = ref("")
  const username = ref("")
  const projectId = ref(0);
  const theme = ref("bootstrap5");
  //Development
  const tokenType = ref("Static");
  const msalToken = ref("ts25Bxi9qjJL2Ed2L8EHfCPygeZmruqYZPxJUGRbrQwdEfyusgh5WCDzTEB2ItUh");
  //Production
  // const tokenType = ref("Bearer");
  // const msalToken = ref("");
  const mediaBreakpoint = ref("lg");
  const sendMicroToSuperApp = ref(null);

  function setAppDivId(value) {
    appDivId.value = value;
  }

  function setUsername(value) {
    username.value = value;
  }

  function setProjectId(value) {
    projectId.value = value;
  }

  function setTheme(value) {
    theme.value = value;
  }

  function setMsalToken(value) {
    msalToken.value = value;
  }

  function setMediaBreakpoint(value) {
    mediaBreakpoint.value = value;
  }

  function setSendMicroToSuperAppMethod(value) {
    sendMicroToSuperApp.value = value;
  }

  function setInitStore(value) {
    Object.keys(value).forEach(k => {
      //AnhTranTuan 2023-03-22: Skip if key is not exist.
      if (!(!!this[k] && typeof this[k] === 'object')) return;

      this[k].value = value[k];
    })
  }

  return { appDivId, username, projectId, theme, tokenType, msalToken, mediaBreakpoint, setAppDivId, setUsername, setProjectId, setTheme, setMsalToken, setMediaBreakpoint, setSendMicroToSuperAppMethod, setInitStore }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDefaultStore, import.meta.hot));
}