"use client";

import { useForm } from "@refinedev/react-hook-form";
import { EditView, EditViewHeader } from "@/components/refine-ui/views/edit-view";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function OrderEditPage() {
  const { refineCore: { onFinish }, ...form } = useForm({ refineCoreProps: { resource: "orders" } });
  const onSubmit = (values: Record<string, string>) => onFinish(values);
  return (
    <EditView>
      <EditViewHeader resource="orders" title="Edit order" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="user_id" rules={{ required: "User ID is required" }} render={({ field }) => (
            <FormItem><FormLabel>User ID</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <div className="grid gap-4 md:grid-cols-2">
            <FormField control={form.control} name="status" rules={{ required: "Status is required" }} render={({ field }) => (
              <FormItem><FormLabel>Status</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="payment_status" rules={{ required: "Payment status is required" }} render={({ field }) => (
              <FormItem><FormLabel>Payment Status</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <FormField control={form.control} name="total_price" rules={{ required: "Total price is required" }} render={({ field }) => (
            <FormItem><FormLabel>Total Price</FormLabel><FormControl><Input {...field} type="number" step="0.01" value={field.value || ""} /></FormControl><FormMessage /></FormItem>
          )} />
          <Button type="submit" {...form.saveButtonProps} disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Updating..." : "Update"}</Button>
        </form>
      </Form>
    </EditView>
  );
}
