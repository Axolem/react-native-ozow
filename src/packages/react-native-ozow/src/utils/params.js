function getSearchParams(urlArr) {
    const params = urlArr[1].split('&');
    const obj = {};
    params.forEach((param) => {
        const [key, value] = param.split('=');
        obj[key] = value;
    });
    return obj;
}
export default getSearchParams;
