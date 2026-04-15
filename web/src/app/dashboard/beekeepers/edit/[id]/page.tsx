"use client";

import { useForm } from "@refinedev/react-hook-form";
import { EditView, EditViewHeader } from "@/components/refine-ui/views/edit-view";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BeekeeperEditPage() {
  const { refineCore: { onFinish }, ...form } = useForm({ refineCoreProps: { resource: "beekeepers" } });
  const onSubmit = (values: Record<string, string>) => onFinish(values);

  return (
    <EditView>
      <EditViewHeader resource="beekeepers" title="Edit beekeeper" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField control={form.control} name="user_id" rules={{ required: "User ID is required" }} render={({ field }) => (
              <FormItem><FormLabel>User ID</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="name" rules={{ required: "Name is required" }} render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField control={form.control} name="region" rules={{ required: "Region is required" }} render={({ field }) => (
              <FormItem><FormLabel>Region</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="years_experience" rules={{ required: "Years of experience is required" }} render={({ field }) => (
              <FormItem><FormLabel>Years Experience</FormLabel><FormControl><Input {...field} type="number" value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <FormField control={form.control} name="farm_location" rules={{ required: "Farm location is required" }} render={({ field }) => (
            <FormItem><FormLabel>Farm Location</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="certification_status" rules={{ required: "Certification status is required" }} render={({ field }) => (
            <FormItem><FormLabel>Certification Status</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="bio" render={({ field }) => (
            <FormItem><FormLabel>Bio</FormLabel><FormControl><Textarea {...field} value={field.value || ""} rows={5} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="created_at" rules={{ required: "Created date is required" }} render={({ field }) => (
            <FormItem><FormLabel>Created At</FormLabel><FormControl><Input {...field} type="datetime-local" value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <Button type="submit" {...form.saveButtonProps} disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Updating..." : "Update"}</Button>
        </form>
      </Form>
    </EditView>
  );
}
