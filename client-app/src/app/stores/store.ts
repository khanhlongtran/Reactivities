import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
// Trong đối tượng Store có đối tượng ActivityStore
// Trong đối tượng ActivityStore có title là properties

interface Store {
    activityStore: ActivityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}