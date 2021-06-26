import { useState } from 'react';
import { database } from "../firebase";

export default initialPurchases => {
    const [purchases, setPurchases] = useState(initialPurchases);
    return {
        purchases,
        setPurchases,
        addNewPurchase: async (newPurchase) => { database.ref('purchases/' + newPurchase.purchaseId).set(newPurchase) },
        editPurchase: (updatedPurchase, purchaseId) => { database.ref('purchases/' + purchaseId).update(updatedPurchase) },
        removePurchase: async (purchaseId) => { database.ref('purchases/' + purchaseId).remove() },
    }
}