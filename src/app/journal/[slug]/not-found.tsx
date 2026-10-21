import ContentNotFound from "@/components/content-not-found";

export default function JournalNotFound() {
  return (
    <ContentNotFound
      title="This entry isn't available."
      description="It may have been unpublished or moved. You can find our latest journal entries below."
      href="/journal"
      linkLabel="Browse the journal"
    />
  );
}