import React, { createContext, useContext } from "react";
import useServicesState from "../hooks/useServicesState";

const ServicesContext = createContext();

export function useServicesContext() {
    return useContext(ServicesContext);
}

export function ServicesProvider(props) {
    const { services, setServices, addNewService, editService, removeService } = useServicesState([])
    const value = {
        services,
        setServices,
        addNewService,
        editService,
        removeService
    }
    return (
        <ServicesContext.Provider value={value}>
            {props.children}
        </ServicesContext.Provider>
    )
} 