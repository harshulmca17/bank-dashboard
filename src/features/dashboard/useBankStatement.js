import { useQuery } from "@tanstack/react-query";
import { fetchBankStatement } from "../../services/apiBanks";

import { useSearchParams } from "react-router-dom";

export default function useBankStatement() {
    const [searchParams] = useSearchParams();

    // const numbDays = !searchParams.get("last");
    const daysGap = searchParams.get("last")
        ? parseInt(searchParams.get("last"))
        : 30; // default 30 days


    const id = searchParams.get("bank")
        ? parseInt(searchParams.get("bank"))
        : 1; // default 30 days

    const { isLoading, data: entries } = useQuery({
        queryKey: ["bankStatment", id, daysGap],
        queryFn: () => fetchBankStatement({ id, daysGap }),
    });

    let creditAmount = parseFloat(0);
    let debitAmount = parseFloat(0);
    let creditTransactionCount = 0;
    let debitTransactionCount = 0;
    if (!isLoading) {

        entries.map((entry) => {
           
            if (entry.type === "DEBIT") {
                debitAmount += parseFloat(entry.amount);
                debitTransactionCount++;
            } else {
                creditAmount += parseFloat(entry.amount);
                creditTransactionCount++;

            }
        })
    }
    return { isLoading, entries, debitAmount, debitTransactionCount, creditAmount, creditTransactionCount,daysGap };
}
