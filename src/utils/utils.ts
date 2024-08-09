export const getSegment = (pathname : string, index : number) => {
    const parts = pathname.split('/');
    return parts[index]; 
};
