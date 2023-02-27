const passwordPrompt = () => {
  const password = prompt("Lūdzu, ievadiet paroli:");
  password && sessionStorage.setItem("accesss_key", password);
};

export default passwordPrompt;
