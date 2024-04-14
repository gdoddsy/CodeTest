export const action = {
    get: <TResponse>(url: string) => request<TResponse>(url),
    post: <TBody extends BodyInit, Response>(url: string, body: TBody) => 
        request<Response>(url, { 
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            }, 
            body 
        })
}

// Make the `request` function generic to specify the return data type:
async function request<TResponse>(url: string, config: RequestInit = {} ) : Promise<TResponse> {
    const baseurl = 'https://codetestwebapp20240407064956.azurewebsites.net/';

    const response = await fetch(baseurl + url, config);

    const json = await response.json();

    return json as TResponse;
}