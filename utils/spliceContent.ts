// Return short content for recipe cards

const spliceContent = (content: string) => {
  const result = content.slice(0, 100) + `... Lasīt vairāk`;
  return result;
};

export default spliceContent;
