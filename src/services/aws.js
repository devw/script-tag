const config = require("../config.js");

const postData = async (url, data) => {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json();
};

export const aws = {
    validateEmail: async (email) => {
        const resp = await postData(`${config.AWS}/prod/customers/search`, {
            email: email,
        });
        return resp.data;
    },
};
