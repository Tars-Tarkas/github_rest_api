export type detailsTypes = {
  details: {
    name: string;
    language: string;
    stargazers_count: number;
    topics: [];
    license: { name: string };
  };
};

export type DataFetchType = {
  data: { items?: []; total_count?: number };
  isLoading: boolean;
  error: string;
};

export type HeaderPropsType = {
  getValue: (value: string) => void;
};
