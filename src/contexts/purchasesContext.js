import React, { createContext, useContext } from "react";
import usePurchasesState from "../hooks/usePurchasesState";

const PurchasesContext = createContext();

export function usePurchasesContext() {
    return useContext(PurchasesContext);
}

export function PurchasesProvider(props) {
    const { purchases, setPurchases, addNewPurchase, editPurchase, removePurchase } = usePurchasesState([])
    const value = {
        purchases,
        setPurchases,
        addNewPurchase,
        editPurchase,
        removePurchase
    }
    return (
        <PurchasesContext.Provider value={value}>
            {props.children}
        </PurchasesContext.Provider>
    )
}
