"use client";

import { FileIcon, ImageIcon, Loader2, Upload } from "lucide-react";
import { useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { compressFileBeforeUpload } from "@/lib/upload/file-compression";

type FileUploadProps = {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  className?: string;
  accept?: string;
};

type CloudinaryUploadResponse = {
  secure_url?: string;
  url?: string;
  error?: { message?: string };
};

function cloudinaryUploadEndpoint(file: File, cloudName: string): string {
  const base = `https://api.cloudinary.com/v1_1/${cloudName}`;
  if (file.type.startsWith("image/")) return `${base}/image/upload`;
  if (file.type.startsWith("video/")) return `${base}/video/upload`;
  return `${base}/raw/upload`;
}

function isLikelyImageUrl(url: string): boolean {
  const u = url.toLowerCase();
  return (
    u.includes("/image/upload/") ||
    /\.(jpg|jpeg|png|gif|webp|svg|avif|bmp)(\?|$)/i.test(u)
  );
}

export function FileUpload({
  value,
  onChange,
  disabled,
  className,
  accept = "image/*,.pdf,.doc,.docx,.txt,.csv,.json",
}: FileUploadProps) {
  const inputId = useId();
  const dragDepth = useRef(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFile(rawFile: File) {
    setError(null);
    setIsUploading(true);

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET?.trim();
      if (!cloudName || !uploadPreset) {
        throw new Error(
          "Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.",
        );
      }

      const file = await compressFileBeforeUpload(rawFile, {
        maxImageWidth: 1920,
        imageQuality: 0.82,
      });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const endpoint = cloudinaryUploadEndpoint(file, cloudName);
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as CloudinaryUploadResponse;
      if (!response.ok) {
        throw new Error(payload.error?.message || "Upload failed");
      }

      const url = payload.secure_url ?? payload.url;
      if (!url) {
        throw new Error("Upload failed: missing URL in response");
      }
      onChange(url);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Upload failed. Check your Cloudinary preset and try again.";
      setError(message);
    } finally {
      setIsUploading(false);
    }
  }

  function handleFileFromInput(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) {
      void uploadFile(file);
    }
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragDepth.current += 1;
    if (e.dataTransfer.types.includes("Files")) setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragDepth.current -= 1;
    if (dragDepth.current <= 0) {
      dragDepth.current = 0;
      setIsDragging(false);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.types.includes("Files")) {
      e.dataTransfer.dropEffect = "copy";
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragDepth.current = 0;
    setIsDragging(false);
    if (disabled || isUploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void uploadFile(file);
    }
  }

  const inactive = disabled || isUploading;
  const showImagePreview = Boolean(value && isLikelyImageUrl(value));

  return (
    <div className={cn("space-y-3", className)}>
      <input
        id={inputId}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleFileFromInput}
        disabled={inactive}
      />

      <label
        htmlFor={inputId}
        className={cn(
          "relative flex min-h-[240px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
          "border-muted-foreground/25 bg-muted/30 hover:border-muted-foreground/40 hover:bg-muted/45",
          "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
          isDragging && "border-primary bg-primary/5 hover:border-primary hover:bg-primary/10",
          inactive && "pointer-events-none cursor-not-allowed opacity-60",
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="size-10 animate-spin" aria-hidden />
            <p className="text-sm font-medium">Uploading…</p>
          </div>
        ) : showImagePreview ? (
          <div className="flex w-full flex-col items-center gap-4">
            <div className="relative max-h-[200px] w-full max-w-md overflow-hidden rounded-lg border bg-background shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Current preview"
                className="mx-auto max-h-[200px] w-auto object-contain"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-medium text-foreground">Image ready</p>
              <p className="text-xs text-muted-foreground">
                Drop a new file or click to replace
              </p>
            </div>
          </div>
        ) : value ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
              <FileIcon className="size-7 text-muted-foreground" aria-hidden />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">File attached</p>
              <p className="max-w-[280px] truncate text-xs text-muted-foreground" title={value}>
                {value}
              </p>
              <p className="text-xs text-muted-foreground">
                Drop or click to replace with another file
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div
              className={cn(
                "flex size-16 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-border",
                isDragging && "ring-primary/50",
              )}
            >
              <Upload className="size-8 text-muted-foreground" aria-hidden />
            </div>
            <div className="space-y-1">
              <p className="text-base font-medium text-foreground">
                Drag and drop a file here
              </p>
              <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                <span>or</span>
                <span className="font-medium text-primary underline-offset-4 hover:underline">
                  browse to upload
                </span>
              </p>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ImageIcon className="size-3.5 shrink-0 opacity-70" aria-hidden />
                Images are resized before upload; other files upload as-is
              </p>
            </div>
          </div>
        )}
      </label>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          type="url"
          placeholder="Or paste a URL (https://…)"
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          className="min-w-0 flex-1"
        />
        {value && !disabled ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={() => onChange("")}
          >
            Clear
          </Button>
        ) : null}
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
