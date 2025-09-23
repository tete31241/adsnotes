import EditNotePageComponent from '@/components/edit-note-page';

// This function is required to make this page compatible with the `output: export`
// configuration in next.config.js. It tells Next.js which paths to pre-render
// at build time.
export async function generateStaticParams() {
  // In a real application, you would fetch a list of note IDs from a database
  // or API here. For this example, we'll just return an empty array, which
  // means no note pages will be pre-rendered at build time.
  return [];
}

export default function EditNotePage() {
  return <EditNotePageComponent />;
}
