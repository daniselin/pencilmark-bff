import axios from "axios";

const apiAxios = axios.create({
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
    },
});

apiAxios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = localStorage.getItem('token') ? "JWT " + localStorage.getItem('token') : null;
    return config;
});

apiAxios.interceptors.request.use(function (response) {
    return response;
}, function (error) {
    if (!error.response || (error.response && error.response.status && error.response.status === 401)) {
        return Promise.reject({...error, message: "Unauthenticated"});
    } else {
        return Promise.reject({...error, message: error.message});
    }
});

export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default apiAxios;
