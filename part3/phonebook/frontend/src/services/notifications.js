function handleNotification(message, variant, setNotification) {
  setNotification({
    message: message,
    variant: variant,
  });
  setInterval(() => setNotification({ message: null, variant: null }), 5000);
}

export { handleNotification };
