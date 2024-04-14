export function objectToQueryString(param: any) {
    return Object.keys(param).map(key => key + '=' + param[key]).join('&');
}