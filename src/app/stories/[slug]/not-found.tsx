import ContentNotFound from "@/components/content-not-found";

export default function StoryNotFound() {
  return (
    <ContentNotFound
      title="This story isn't available."
      description="It may have been unpublished or moved. You can find our latest stories below."
      href="/stories"
      linkLabel="Browse all stories"
    />
  );
}