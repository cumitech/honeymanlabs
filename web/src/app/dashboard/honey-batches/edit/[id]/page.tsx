"use client";

import { useForm } from "@refinedev/react-hook-form";
import { EditView, EditViewHeader } from "@/components/refine-ui/views/edit-view";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function HoneyBatchEditPage() {
  const { refineCore: { onFinish }, ...form } = useForm({ refineCoreProps: { resource: "honey_batches" } });
  const onSubmit = (values: Record<string, string>) => onFinish(values);
  return (
    <EditView>
      <EditViewHeader resource="honey_batches" title="Edit honey batch" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField control={form.control} name="batch_code" rules={{ required: "Batch code is required" }} render={({ field }) => (
              <FormItem><FormLabel>Batch Code</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="region" rules={{ required: "Region is required" }} render={({ field }) => (
              <FormItem><FormLabel>Region</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField control={form.control} name="beekeeper_id" rules={{ required: "Beekeeper ID is required" }} render={({ field }) => (
              <FormItem><FormLabel>Beekeeper ID</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="apiary_id" rules={{ required: "Apiary ID is required" }} render={({ field }) => (
              <FormItem><FormLabel>Apiary ID</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <FormField control={form.control} name="harvest_date" rules={{ required: "Harvest date is required" }} render={({ field }) => (
            <FormItem><FormLabel>Harvest Date</FormLabel><FormControl><Input {...field} type="date" value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="floral_source" rules={{ required: "Floral source is required" }} render={({ field }) => (
            <FormItem><FormLabel>Floral Source</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <div className="grid gap-4 md:grid-cols-2">
            <FormField control={form.control} name="moisture_content" rules={{ required: "Moisture content is required" }} render={({ field }) => (
              <FormItem><FormLabel>Moisture Content</FormLabel><FormControl><Input {...field} type="number" step="0.01" value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="certification_status" rules={{ required: "Certification status is required" }} render={({ field }) => (
              <FormItem><FormLabel>Certification Status</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <Button type="submit" {...form.saveButtonProps} disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Updating..." : "Update"}</Button>
        </form>
      </Form>
    </EditView>
  );
}
