const spliceContent = (content: string) => {
  const result =
    //content.split("\n").join(" ").split(" ").splice(0, 10).join(" ") +
    content.slice(0, 100) + `... Lasīt vairāk`;
  return result;
};

export default spliceContent;
