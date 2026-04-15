"use client";

import { useCreate } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import type { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CreateView, CreateViewHeader } from "@/components/refine-ui/views/create-view";
import { FileUpload } from "@/components/shared/file-upload";
import { ProductGalleryImagesField } from "@/components/shared/product-gallery-images-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductTypeFields } from "@/components/dashboard/product-type-fields";
import { DEFAULT_PRODUCT_TYPE } from "@/models/product";

export default function ProductCreatePage() {
  const router = useRouter();
  const { mutateAsync: createRecord, mutation: createMutation } = useCreate();
  const isSaving = createMutation.isPending;
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);

  const formMethods = useForm<FieldValues>({
    refineCoreProps: { resource: "products" },
    defaultValues: {
      product_type: DEFAULT_PRODUCT_TYPE,
      weight_grams: "",
      liters: "",
      apparel_size: "",
    },
  });
  const { handleSubmit, formState, control, setValue } = formMethods;

  async function onSubmit(values: FieldValues) {
    const { data: created } = await createRecord({
      resource: "products",
      values,
    });
    const productId = created?.id as string | undefined;
    if (!productId) return;

    for (const image_url of galleryUrls) {
      await createRecord({
        resource: "product_images",
        values: { product_id: productId, image_url },
      });
    }

    router.push(`/dashboard/products/edit/${productId}`);
  }

  const submitting = formState.isSubmitting || isSaving;

  return (
    <CreateView>
      <CreateViewHeader resource="products" title="Create product" />
      <Form {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl space-y-8 pb-10"
        >
          <Card>
            <CardHeader>
              <CardTitle>Basic information</CardTitle>
              <CardDescription>Name, URL slug, and description shoppers will see.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={formMethods.control}
                  name="name"
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="slug"
                  rules={{ required: "Slug is required" }}
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={formMethods.control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} value={field.value || ""} rows={6} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product type &amp; sizing</CardTitle>
              <CardDescription>
                Choose what you sell — fields update based on honey, processed products, apparel, or
                lab items.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductTypeFields control={control} setValue={setValue} disabled={submitting} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory &amp; classification</CardTitle>
              <CardDescription>Pricing, stock, category, and origin.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={formMethods.control}
                  name="price"
                  rules={{ required: "Price is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          value={field.value || ""}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="stock_quantity"
                  rules={{ required: "Stock quantity is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock quantity</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" value={field.value || ""} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="category"
                  rules={{ required: "Category ID is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category ID</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="origin_region"
                  rules={{ required: "Origin region is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origin region</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
              <CardDescription>Featured image and optional gallery photos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <FormField
                control={formMethods.control}
                name="featured_image"
                rules={{ required: "Featured image URL is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured image</FormLabel>
                    <FormControl>
                      <FileUpload
                        value={field.value || ""}
                        onChange={field.onChange}
                        disabled={submitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="border-t pt-8">
                <h3 className="mb-1 text-sm font-medium">More product photos</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Optional — shown beside the main image on the storefront when you wire them up.
                </p>
                <ProductGalleryImagesField
                  pendingUrls={galleryUrls}
                  onPendingUrlsChange={setGalleryUrls}
                  disabled={submitting}
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating…" : "Create product"}
          </Button>
        </form>
      </Form>
    </CreateView>
  );
}
