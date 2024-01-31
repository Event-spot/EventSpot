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
    accept: acceptedFileTypes,
    maxSize: 1024 * 1000
  });


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