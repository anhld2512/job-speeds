export default () => {
  const { $bootstrap } = useNuxtApp();
  const createdTooltip = () => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => {
      const tooltip = new $bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: "hover",
        placement: "auto",
      });
      tooltipTriggerEl.addEventListener("shown.bs.tooltip", () => {
        setTimeout(() => {
          tooltip.hide(); //close the tooltip
        }, 6000);
      });

      return tooltip;
    });
  };
  const Toast = (toastObj) => {
    const defaultToastOptions = {
      content: toastObj.content,
      cssClass: `${toastObj.cssClass}`,
      showCloseButton: true,
      timeOut: 5000,
      icon: toastObj.icon,
      isOpen: false
    };
  
    const finalToastOptions = toastObj.title
      ? { title: toastObj.title, ...defaultToastOptions }
      : { ...defaultToastOptions };
  
    return finalToastOptions
  };
  return {
    createdTooltip,
    Toast
  };
};
