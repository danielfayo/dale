"use client";

import { useDispatch } from "react-redux";
import useFetchProducts from "./useFetchProducts";
import { AppDispatc, useAppSelector } from "@/redux/store";
import { updateTotalRevenue } from "@/redux/features/totalRevenueSlice";
import { useEffect } from "react";
import useGetTransactionData from "./useGetTransactions";

const useGetTotalRevenue = () => {
  const { productSnippets } = useFetchProducts();
  const {result} = useGetTransactionData()

  const dispatch = useDispatch<AppDispatc>();
  const totalRev = useAppSelector((state) => state.totalRevenue.totalRevenue);

  useEffect(() => {
      let totalRevenue = 0;
    for (let i = 0; i < result?.length!; i++) {
      dispatch(updateTotalRevenue((totalRevenue += +result![i].productPrice!)));
    }
  }, [result]);

  return { totalRev };
};
export default useGetTotalRevenue;
