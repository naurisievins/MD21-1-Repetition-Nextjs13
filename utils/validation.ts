import { z } from "zod";

export const nameValidation = (value: string) => {
  const nameValidation = z
    .string()
    .trim()
    .min(3, { message: "Nosaukumam jābūt vismaz 3 simbolus garam!" })
    .transform((val: string) => val.toLowerCase())
    .transform((val: string) => val.charAt(0).toUpperCase() + val.slice(1))
    .safeParse(value);

  if (!nameValidation.success) {
    return JSON.parse(nameValidation.error.message)[0].message;
  }
};

export const categoryValidation = (value: string) => {
  const categoryValidation = z
    .string()
    .trim()
    .min(3, {
      message: "Kategorijas nosaukumam jābūt vismaz 3 simbolus garam!",
    })
    .max(20, { message: "Kategorijas nosaukums nevar pārsniegt 20 simbolus!" })
    .transform((val: string) => val.toLowerCase())
    .transform((val: string) => val.charAt(0).toUpperCase() + val.slice(1))
    .safeParse(value);

  if (!categoryValidation.success) {
    return JSON.parse(categoryValidation.error.message)[0].message;
  }
};

export const urlValidation = (value: string) => {
  const validateUrl = z
    .string()
    .trim()
    .url({
      message: "Nederīga saite uz bildi!",
    })
    .regex(/.(png|gif|webp|jpeg|jpg)$/, {
      message: "Bildei jābūt .png, .gif, .webp, .jpeg vai .jpg formātā!",
    })
    .safeParse(value);

  if (!validateUrl.success) {
    return JSON.parse(validateUrl.error.message)[0].message;
  }
};

export const contentValidation = (value: string) => {
  const validateContent = z
    .string()
    .trim()
    .min(50, { message: "Aprakstam jābūt vismaz 50 simbolus garam!" })
    .max(5000, { message: "Aprakstam nevar pārsniegt 5000 simbolus!" })
    .transform((val: string) => val.charAt(0).toUpperCase() + val.slice(1))
    .safeParse(value);

  if (!validateContent.success) {
    return JSON.parse(validateContent.error.message)[0].message;
  }
};
