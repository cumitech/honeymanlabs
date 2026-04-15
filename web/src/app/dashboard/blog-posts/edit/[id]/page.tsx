import { redirect } from "next/navigation";

type LegacyBlogPostsEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LegacyBlogPostsEditPage({
  params,
}: LegacyBlogPostsEditPageProps) {
  const { id } = await params;
  redirect(`/dashboard/articles/edit/${id}`);
}
