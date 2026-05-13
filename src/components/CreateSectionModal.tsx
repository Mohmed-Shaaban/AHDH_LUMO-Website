// components/CreateSectionModal.tsx

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axiosInstance from "@/lib/axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Plus } from "lucide-react";
import { useState } from "react";
import { createSectionSchema, type createSectionType ,type createSectionInputType } from "@/schema/section/sectionSchemas";
import { useCreateSection } from "@/features/sections/useCreateSection";



export default function CreateSectionModal() {
  const [open, setOpen] = useState(false);

  const {mutateCreateSection,isPending} = useCreateSection({
    onSuccess:() => {
        reset();
        setOpen(false)
    }
  })


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createSectionInputType>({
    resolver: zodResolver(createSectionSchema),

    defaultValues: {
      name: "",
      description: "",
      order: 0,
    },
  });



  const onSubmit = (data: createSectionInputType) => {
  mutateCreateSection({
    ...data,
    order: Number(data.order),
  });
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-900">
          <Plus className="mr-2 h-4 w-4" />
          Create Section
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Create Section</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Name */}
          <div className="space-y-2">
            <Input
              placeholder="Section Title"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Textarea
              placeholder="Description"
              rows={5}
              {...register("description")}
            />

            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Order */}
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Order"
              {...register("order", {
                valueAsNumber: true,
                })}
            />

            {errors.order && (
              <p className="text-sm text-red-500">
                {errors.order.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}