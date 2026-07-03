import { createSection, deleteSection } from "@/services/Sections/sections.api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

type UseCreateSectionProps = {
  onSuccess?: () => void;
};

type UseDeleteSectionProps = {
  onSuccess?: () => void;
};

export const useDeleteSection = ({
  onSuccess,
}: UseDeleteSectionProps = {}) => {
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteSection, isPending } = useMutation({
    mutationFn: deleteSection,

    onSuccess: () => {
      toast.success("Section deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["sections"],
      });

      onSuccess?.();
    },

    onError: (error) => {
      toast.error("Could not delete section");
      console.error(error);
    },
  });

  return {
    mutateDeleteSection,
    isPending,
  };
};

export const useCreateSection = ({onSuccess}:UseCreateSectionProps={}) => {
    const queryClient = useQueryClient();

    const {mutate:mutateCreateSection,isPending} = useMutation({
        mutationFn:createSection,
        onSuccess:() => {
            toast.success('section created successfully')
            queryClient.invalidateQueries({
                queryKey:['sections']
            })
            onSuccess?.();
        },
        onError:(e:unknown) => {
            toast.error('could not create cabin');
            console.log(e)
        }

    })

    return{mutateCreateSection,isPending}
}