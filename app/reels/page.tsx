import { redirect } from "next/navigation";

export default async function ReelsPage({
  searchParams,
}: {
  searchParams: Promise<{ story?: string }>;
}) {
  const params = await searchParams;

  if (params.story) {
    redirect(`/lore?tab=reels&story=${params.story}`);
  }

  redirect("/lore?tab=reels");
}
