
export const isValidBigIntID = (id) => {
    const regex = /^\d+$/; 
    return regex.test(id);
};
