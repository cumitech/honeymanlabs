export type BlogPost = {
  id: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  category: {
    id: string;
    title: string;
  };
};
