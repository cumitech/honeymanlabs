import { redirect } from "next/navigation";

type LegacyCategoriesEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LegacyCategoriesEditPage({
  params,
}: LegacyCategoriesEditPageProps) {
  const { id } = await params;
  redirect(`/dashboard/article-categories/edit/${id}`);
}
