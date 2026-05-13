import { createSection } from "@/services/Sections/sections.api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

type UseCreateSectionProps = {
  onSuccess?: () => void;
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