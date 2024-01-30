'use client'
import { useCallback, useState } from 'react';
import { useDropzone, Accept } from 'react-dropzone';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);

    // Tworzenie URL podglądu
    const fileUrl = URL.createObjectURL(uploadedFile);
    setPreviewUrl(fileUrl);
  }, []);

  const acceptedFileTypes: Accept = {
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png']
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Proszę wybrać plik przed wysłaniem.");
      return;
    }

    try {
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      alert("Plik został pomyślnie przesłany.");
    } catch (e: any) {
      console.error(e);
      alert("Wystąpił błąd podczas przesyłania pliku.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        {previewUrl ? (
          <img src={previewUrl} alt="Podgląd" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        ) : (
          <p>Przeciągnij pliki tutaj, lub kliknij, aby wybrać pliki</p>
        )}
      </div>
      <button type="submit">Upload</button>
    </form>
  );
}