export const SHOW_TOAST = 'toast/SHOW_TOAST';
export const HIDE_TOAST = 'toast/HIDE_TOAST';

export const showToast = (message) => ({
  type: SHOW_TOAST,
  payload: message,
});

export const hideToast = () => ({
  type: HIDE_TOAST,
  payload: null,
})
