import { useQuery } from "@tanstack/react-query";

const useSections = () => {
    const {data:sections,error,isLoading:loadingSections} = useQuery({
        queryKey:['sections'],
        queryFn:
    })


    return {sections,error,loadingSections}

}
export default useSections;