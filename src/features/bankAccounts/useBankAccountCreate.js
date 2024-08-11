import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createAccountApi } from "../../services/apiBanks";

export function useBankAccountCreate() {
  const queryClient = useQueryClient();
  const { isLoading: isCreateLoading, mutate: createAccount } = useMutation({
    mutationFn: createAccountApi,
    onSuccess: () => {
      toast.success(`New Account Created Successfully..`);
      queryClient.invalidateQueries({
        queryKey: ["banks"],
      });
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreateLoading, createAccount };
}
