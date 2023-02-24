const spliceContent = (content: string) => {
  const result =
    content.split("\n").join(" ").split(" ").splice(0, 10).join(" ") +
    "... Lasīt vairāk";
  return result;
};

export default spliceContent;
