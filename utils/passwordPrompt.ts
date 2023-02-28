import { toast } from "react-toastify";

const passwordPrompt = () => {
  const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;

  const handleAccept = (value: string) => {
    const password = value;
    password && sessionStorage.setItem("accesss_key", password);
    password && body?.removeChild(promptContainer);
    if (password === accessKey) {
      toast.success("Parole pareiza!");
    } else if (password && password !== accessKey) {
      toast.error("Nepareiza parole!");
    }
  };

  const handleCancel = () => {
    body?.removeChild(promptContainer);
  };

  const promptContainer = document.createElement("div");
  promptContainer.classList.add("password_prompt");

  const inputForm = document.createElement("form");
  inputForm.classList.add("password_prompt__form");

  const label = document.createElement("label");
  label.innerText = "Lai veiktu šo darbību, lūdzu, ievadiet paroli:";

  const input = document.createElement("input");
  input.classList.add("password_prompt__input");
  input.type = "password";
  input.required = true;

  label.appendChild(input);

  const acceptButton = document.createElement("button");
  acceptButton.classList.add("password_prompt__button");
  acceptButton.innerText = "Apstiprināt";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("password_prompt__button");
  cancelButton.innerText = "Atcelt";

  inputForm.appendChild(label);
  inputForm.appendChild(acceptButton);
  inputForm.appendChild(cancelButton);
  promptContainer.appendChild(inputForm);

  const body = document.querySelector("body");
  body?.appendChild(promptContainer);
  input.focus();

  acceptButton.addEventListener("click", () => handleAccept(input.value));
  cancelButton.addEventListener("click", handleCancel);
};

export default passwordPrompt;
