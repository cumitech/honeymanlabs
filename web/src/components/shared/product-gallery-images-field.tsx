"use client";

import { useCreate, useDelete, useList } from "@refinedev/core";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

import { FileUpload } from "@/components/shared/file-upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/models/product-image";

type ProductGalleryImagesFieldProps = {
  /** When unset, uploads are queued in `pendingUrls` until the product is created. */
  productId?: string;
  pendingUrls?: string[];
  onPendingUrlsChange?: (urls: string[]) => void;
  disabled?: boolean;
  className?: string;
};

export function ProductGalleryImagesField({
  productId,
  pendingUrls = [],
  onPendingUrlsChange,
  disabled,
  className,
}: ProductGalleryImagesFieldProps) {
  const isPersisted = Boolean(productId);

  const { query, result } = useList<ProductImage>({
    resource: "product_images",
    filters: productId
      ? [{ field: "product_id", operator: "eq", value: productId }]
      : [],
    pagination: { currentPage: 1, pageSize: 100, mode: "server" },
    queryOptions: { enabled: isPersisted },
  });

  const { mutateAsync: createImage } = useCreate();
  const { mutateAsync: removeImage } = useDelete();
  const [mutating, setMutating] = useState(false);

  const savedImages = result?.data ?? [];
  const isLoadingList = isPersisted && query.isLoading;

  async function onUploaded(url: string) {
    if (!url) return;
    if (!isPersisted) {
      onPendingUrlsChange?.([...pendingUrls, url]);
      return;
    }
    setMutating(true);
    try {
      await createImage({
        resource: "product_images",
        values: { product_id: productId, image_url: url },
      });
      await query.refetch();
    } finally {
      setMutating(false);
    }
  }

  function removePendingAt(url: string) {
    onPendingUrlsChange?.(pendingUrls.filter((u) => u !== url));
  }

  async function removeSaved(row: ProductImage) {
    setMutating(true);
    try {
      await removeImage({
        resource: "product_images",
        id: row.id,
      });
      await query.refetch();
    } finally {
      setMutating(false);
    }
  }

  const busy = disabled || mutating;

  return (
    <div className={cn("space-y-4", className)}>
      {!isPersisted ? (
        <p className="text-sm text-muted-foreground">
          These images are saved to the server when you create the product. You can add more or
          remove them later from the product editor.
        </p>
      ) : null}

      {isLoadingList ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" aria-hidden />
          Loading gallery…
        </div>
      ) : null}

      <FileUpload
        value=""
        onChange={(u) => {
          void onUploaded(u);
        }}
        accept="image/*"
        disabled={busy}
        className="[&_label]:min-h-[200px]"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {savedImages.map((row) => (
          <figure
            key={row.id}
            className="group relative overflow-hidden rounded-lg border bg-muted/20"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={row.image_url}
              alt=""
              className="aspect-square w-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-1 top-1 size-8 opacity-0 transition-opacity group-hover:opacity-100 max-sm:opacity-100"
              disabled={busy}
              aria-label="Remove image"
              onClick={() => void removeSaved(row)}
            >
              <Trash2 className="size-4" />
            </Button>
          </figure>
        ))}
        {pendingUrls.map((url, index) => (
          <figure
            key={`pending-${url}-${index}`}
            className="group relative overflow-hidden rounded-lg border border-dashed bg-muted/30"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="aspect-square w-full object-cover" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-1 top-1 size-8 opacity-0 transition-opacity group-hover:opacity-100 max-sm:opacity-100"
              disabled={busy}
              aria-label="Remove queued image"
              onClick={() => removePendingAt(url)}
            >
              <Trash2 className="size-4" />
            </Button>
          </figure>
        ))}
      </div>
    </div>
  );
}
