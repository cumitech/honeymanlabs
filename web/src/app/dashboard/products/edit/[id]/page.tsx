"use client";

import { useForm } from "@refinedev/react-hook-form";
import type { FieldValues } from "react-hook-form";
import { useParams } from "next/navigation";

import { EditView, EditViewHeader } from "@/components/refine-ui/views/edit-view";
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

export default function ProductEditPage() {
  const params = useParams();
  const productId = typeof params.id === "string" ? params.id : undefined;

  const formMethods = useForm<FieldValues>({
    refineCoreProps: { resource: "products" },
    defaultValues: {
      product_type: DEFAULT_PRODUCT_TYPE,
      weight_grams: "",
      liters: "",
      apparel_size: "",
    },
  });
  const {
    refineCore: { onFinish },
    saveButtonProps,
    handleSubmit,
    formState,
    control,
    setValue,
  } = formMethods;

  function onSubmit(values: FieldValues) {
    onFinish(values);
  }

  const submitting = formState.isSubmitting;

  return (
    <EditView>
      <EditViewHeader resource="products" title="Edit product" />
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
                  Add or remove gallery images stored for this product.
                </p>
                <ProductGalleryImagesField productId={productId} disabled={submitting} />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" {...saveButtonProps} disabled={submitting}>
            {submitting ? "Updating…" : "Update product"}
          </Button>
        </form>
      </Form>
    </EditView>
  );
}
