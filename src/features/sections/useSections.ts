import { getSections } from "@/services/Sections/sections.api";
import { useQuery } from "@tanstack/react-query";

const useSections = () => {
    const {data:sections,error,isLoading:loadingSections} = useQuery({
        queryKey:['sections'],
        queryFn:getSections
    })


    return {sections,error,loadingSections}

}
export default useSections;