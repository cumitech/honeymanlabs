export type ResourceRecord = {
  id: string;
  title?: string;
  name?: string;
  status?: string;
  notes?: string;
  createdAt?: string;
  [key: string]: string | number | boolean | null | undefined;
};
