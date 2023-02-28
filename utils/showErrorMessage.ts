// Show error message on Add or Edit recipe form submit

const showErrorMessage = (message: string) => {
  if (!message || message === "valid") {
    return false;
  } else {
    return true;
  }
};

export default showErrorMessage;
