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

  // Specify the local directory where you want to save the file
  const uploadDir = 'public/uploads'; // Replace with your directory path

  try {
    // Ensure the directory exists, create it if not
    await mkdir(uploadDir, { recursive: true });

    // Define the full path for the new file
    const path = `${uploadDir}/${file.name}`;
    
    // Write the file to the specified directory
    await writeFile(path, buffer);
    console.log(`File saved at ${path}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ success: false, error: 'Error saving file' });
  }
}
