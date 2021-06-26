import { useState } from 'react';
import { database } from "../firebase";

export default initialServices => {
    const [services, setServices] = useState(initialServices);
    return {
        services,
        setServices,
        addNewService: async (newService) => { database.ref('services/' + newService.serviceId).set(newService) },
        editService: async (updatedService, serviceId) => { database.ref('services/' + serviceId).update(updatedService) },
        removeService: async (serviceId) => { database.ref('services/' + serviceId).remove() }
    }
}
