import { useQuery } from "@tanstack/react-query";
import { fetchBankById } from "../../services/apiBanks";

import { useSearchParams } from "react-router-dom";

export default function useBankId() {

    const [searchParams] = useSearchParams();

    // const numbDays = !searchParams.get("last");


    const id = searchParams.get("bank")
        ? parseInt(searchParams.get("bank"))
        : 1; // default 30 days

    const { isLoading, data: bank } = useQuery({
        queryKey: ["bank",id],
        queryFn: () => fetchBankById(id),
    });
    

    return { isLoading, bank };
}
