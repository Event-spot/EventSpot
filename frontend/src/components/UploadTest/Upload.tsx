'use client'
import { useCallback, useState } from 'react';
import { useDropzone, Accept } from 'react-dropzone';

type UploadFormProps = {
  onFileSelect: (file: File) => void;
};

export default function UploadForm({ onFileSelect }: UploadFormProps) {
  // const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    // setFile(uploadedFile);

    // Tworzenie URL podglądu
    const fileUrl = URL.createObjectURL(uploadedFile);
    setPreviewUrl(fileUrl);
    onFileSelect(acceptedFiles[0]);
  }, [onFileSelect]);

  const acceptedFileTypes: Accept = {
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png']
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes
  });

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!file) {
  //     alert("Proszę wybrać plik przed wysłaniem.");
  //     return;
  //   }

  //   try {
  //     const data = new FormData();
  //     data.append('file', file);

  //     const res = await fetch('/api/upload', {
  //       method: 'POST',
  //       body: data
  //     });

  //     if (!res.ok) {
  //       throw new Error(await res.text());
  //     }

  //     alert("Plik został pomyślnie przesłany.");
  //   } catch (e: any) {
  //     console.error(e);
  //     alert("Wystąpił błąd podczas przesyłania pliku.");
  //   }
  // };

  return (

    <div {...getRootProps()} style={{ 
      border: '2px dashed gray', 
      textAlign: 'center', 
      height: "100%",
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center' }}>
        <input {...getInputProps()} />
        {previewUrl ? (
          <img src={previewUrl} alt="Podgląd" style={{ maxWidth: '100%', maxHeight: '250px' }} />
        ) : (
          <p>Przeciągnij pliki tutaj, lub kliknij, aby wybrać pliki</p>
        )}
      </div>

  );
}