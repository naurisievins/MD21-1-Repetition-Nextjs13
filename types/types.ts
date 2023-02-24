export type Recipe = {
  _id: string;
  name: string;
  imgLink: string;
  content: string;
  category: string;
};

export type CharByIdParams = {
  params: {
    id: string;
  };
};

export type CategoryObject = {
  category: string;
};

export type FilterProps = {
  categories: string[];
};
