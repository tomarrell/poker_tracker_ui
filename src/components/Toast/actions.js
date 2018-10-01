export const SHOW_TOAST = "toast/SHOW_TOAST";
export const HIDE_TOAST = "toast/HIDE_TOAST";

export const showToast = (message, type = "success") => ({
  type: SHOW_TOAST,
  payload: {
    message,
    type
  }
});

export const hideToast = () => ({
  type: HIDE_TOAST,
  payload: null
});
