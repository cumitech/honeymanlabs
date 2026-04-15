"use client";

import { useForm } from "@refinedev/react-hook-form";
import { CreateView, CreateViewHeader } from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function ApiaryCreatePage() {
  const { refineCore: { onFinish }, ...form } = useForm({ refineCoreProps: { resource: "apiaries" } });
  const onSubmit = (values: Record<string, string>) => onFinish(values);
  return (
    <CreateView>
      <CreateViewHeader resource="apiaries" title="Create apiary" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField control={form.control} name="beekeeper_id" rules={{ required: "Beekeeper ID is required" }} render={({ field }) => (
              <FormItem><FormLabel>Beekeeper ID</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="name" rules={{ required: "Name is required" }} render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField control={form.control} name="latitude" rules={{ required: "Latitude is required" }} render={({ field }) => (
              <FormItem><FormLabel>Latitude</FormLabel><FormControl><Input {...field} type="number" step="0.000001" value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="longitude" rules={{ required: "Longitude is required" }} render={({ field }) => (
              <FormItem><FormLabel>Longitude</FormLabel><FormControl><Input {...field} type="number" step="0.000001" value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField control={form.control} name="region" rules={{ required: "Region is required" }} render={({ field }) => (
              <FormItem><FormLabel>Region</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="number_of_hives" rules={{ required: "Number of hives is required" }} render={({ field }) => (
              <FormItem><FormLabel>Number of Hives</FormLabel><FormControl><Input {...field} type="number" value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <Button type="submit" {...form.saveButtonProps} disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Creating..." : "Create"}</Button>
        </form>
      </Form>
    </CreateView>
  );
}
