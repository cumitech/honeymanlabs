import { redirect } from "next/navigation";

type LegacyCategoriesShowPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LegacyCategoriesShowPage({
  params,
}: LegacyCategoriesShowPageProps) {
  const { id } = await params;
  redirect(`/dashboard/article-categories/show/${id}`);
}
