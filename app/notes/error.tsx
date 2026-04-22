'use client';

interface NotesErrorProps {
  // Типізація пропса error, який є об'єктом помилки з необов'язковим полем digest.
  error: Error & { digest?: string };
}

function NotesError({ error }: NotesErrorProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}

export default NotesError;
