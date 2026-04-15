"use client";

type CompressOptions = {
  maxImageWidth?: number;
  imageQuality?: number;
};

function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

function isDocumentFile(file: File): boolean {
  const type = file.type.toLowerCase();
  return (
    type.includes("pdf") ||
    type.includes("msword") ||
    type.includes("officedocument") ||
    type.includes("text/") ||
    type.includes("json") ||
    type.includes("csv") ||
    type.includes("xml")
  );
}

async function compressImageFile(file: File, options?: CompressOptions): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file);
    const maxWidth = options?.maxImageWidth ?? 1920;
    const quality = options?.imageQuality ?? 0.82;

    const scale = bitmap.width > maxWidth ? maxWidth / bitmap.width : 1;
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0, width, height);

    const compressedBlob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", quality);
    });

    if (!compressedBlob || compressedBlob.size >= file.size) {
      return file;
    }

    const compressedName = file.name.replace(/\.[^.]+$/, ".jpg");
    return new File([compressedBlob], compressedName, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

async function gzipFile(file: File): Promise<File> {
  try {
    const CompressionStreamCtor = (window as unknown as { CompressionStream?: any })
      .CompressionStream;
    if (!CompressionStreamCtor) {
      return file;
    }

    const stream = file.stream().pipeThrough(new CompressionStreamCtor("gzip"));
    const compressedBlob = await new Response(stream).blob();
    if (compressedBlob.size >= file.size) return file;

    return new File([compressedBlob], `${file.name}.gz`, {
      type: "application/gzip",
    });
  } catch {
    return file;
  }
}

async function compressDocumentFile(file: File): Promise<File> {
  return gzipFile(file);
}

async function compressOtherFile(file: File): Promise<File> {
  return gzipFile(file);
}

export async function compressFileBeforeUpload(
  file: File,
  options?: CompressOptions,
): Promise<File> {
  if (isImageFile(file)) {
    return compressImageFile(file, options);
  }

  if (isDocumentFile(file)) {
    return compressDocumentFile(file);
  }

  return compressOtherFile(file);
}

