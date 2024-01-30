import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = 'public/uploads'; // Katalog zapisu

  try {
    await mkdir(uploadDir, { recursive: true });

    const fileName = file.name;
    const path = `${uploadDir}/${fileName}`;

    await writeFile(path, buffer);

    // Tworzenie URL dla zapisanego pliku
    const fileUrl = `../../../../public/uploads/${fileName}`; // Dostosuj do Twojej domeny

    return NextResponse.json({ success: true, fileUrl: fileUrl });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ success: false, error: 'Error saving file' });
  }
}
