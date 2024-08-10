import { useQuery } from "@tanstack/react-query";
import { fetchBanks } from "../../services/apiBanks";


export default function useBanks() {

    const { isLoading, data: banks } = useQuery({
        queryKey: ["banks"],
        queryFn: () => fetchBanks(),
    });
    

    return { isLoading, banks };
}
