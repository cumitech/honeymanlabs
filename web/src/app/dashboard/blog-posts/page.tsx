import { redirect } from "next/navigation";

export default function LegacyBlogPostsPage() {
  redirect("/dashboard/articles");
}
