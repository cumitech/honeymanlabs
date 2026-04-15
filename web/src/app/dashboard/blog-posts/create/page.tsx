import { redirect } from "next/navigation";

export default function LegacyBlogPostsCreatePage() {
  redirect("/dashboard/articles/create");
}
