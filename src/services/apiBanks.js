const VITE_BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;




export async function fetchBanks() {
    const response = await fetch(`${VITE_BACKEND_ENDPOINT}/banks`);
    if (!response.ok) {
        throw new Error("Banks could not be loaded");
    }
    const newData = await response.json();
    console.log(newData);
    return newData?.result ?? {};
}
export async function createAccountApi(account) {

    const body = { ...account };

    let apiPath = `${VITE_BACKEND_ENDPOINT}/pushBankAccounts`;


    const response = await fetch(apiPath, {
        method: "POST", // HTTP request method

        headers: {
            "Content-Type": "application/json", // Request content type
            // Add other headers if needed, such as Authorization header
        },
        referrerPolicy: "no-referrer", // Referrer policy
        body: JSON.stringify(body), // Request payload data, converted to JSON format
    });
    if (!response.ok) {
        throw new Error("Account could not be loaded");
    }
    const newData = await response.json();



    // Wait for the response to resolve, and return the JSON-formatted response body
    return newData.result ?? {};
}
export async function fetchBankById(id) {
    const response = await fetch(`${VITE_BACKEND_ENDPOINT}/bank/${id}`);
    if (!response.ok) {
        throw new Error("Bank could not be loaded");
    }
    const newData = await response.json();
    console.log(newData);
    return newData?.result ?? {};
}
export async function fetchPaymentById(id) {
    const response = await fetch(`${VITE_BACKEND_ENDPOINT}/payment/${id}`);
    if (!response.ok) {
        throw new Error("Bank could not be loaded");
    }
    const newData = await response.json();
    console.log(newData);
    return newData?.result ?? {};
}

export async function fetchBankStatement({ id, daysGap }) {

    let body = {};

    body.daysGap = parseInt(daysGap);
    body.bankId = parseInt(id);

    const response = await fetch(`${VITE_BACKEND_ENDPOINT}/bankStatement`, {
        method: "POST", // HTTP request method

        headers: {
            "Content-Type": "application/json", // Request content type
        },
        referrerPolicy: "no-referrer", // Referrer policy

        body: JSON.stringify(body), // Request payload data, converted to JSON format
    });
    if (!response.ok) {
        throw new Error("Bank Statment could not be loaded");
    }
    const newData = await response.json();

    return newData?.result ?? [];
}