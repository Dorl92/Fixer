export const searchData = (services) => {
    const data = new Set();
    services.map(service => !data.has(service.category) && data.add(service.category))
    services.map(service => !data.has(service.subcategory) && data.add(service.subcategory))
    return Array.from(data);
}