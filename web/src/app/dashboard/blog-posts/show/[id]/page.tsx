import { redirect } from "next/navigation";

type LegacyBlogPostsShowPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LegacyBlogPostsShowPage({
  params,
}: LegacyBlogPostsShowPageProps) {
  const { id } = await params;
  redirect(`/dashboard/articles/show/${id}`);
}
