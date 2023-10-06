import sendRequest from './send-request';
const BASE_URL = "/api/posts";

export function getImage(formPrompt) {
  return sendRequest(`${BASE_URL}/generateImage`, 'POST', { prompt: formPrompt });
}

export function postImage(form) {
    return sendRequest(`${BASE_URL}/create`, 'POST', { ...form });
}

export function deletePost(id) {
    return sendRequest(`${BASE_URL}/delete/${id}`, 'DELETE');
}

export function getPosts() {
    return sendRequest(BASE_URL);
}

export function getPost(id) {
    return sendRequest(`${BASE_URL}/${id}`);
}

export function getUser(id) {
    return sendRequest(`${BASE_URL}/user/${id}`);
}

export function interpret(id) {
    return sendRequest(`${BASE_URL}/interpret/${id}`);
}