import {API_URL} from "./constants";

const api = {
    retrieveUser: () => API_URL + "/user/",
    createUser: () => API_URL + "/user/create/",

    createPuzzle: () => API_URL + "/puzzle/create/",

    obtainToken: () => API_URL + "/token/obtain/",
    refreshToken: () => API_URL + "/token/refresh/",
    blacklistToken: () => API_URL + "/blacklist/",
    verifyToken: () => API_URL + "/token/verify",

    hello: () => API_URL + "/hello/",
}

export default api;