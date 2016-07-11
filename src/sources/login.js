import fetch from 'isomorphic-fetch'
import config from '../config/config'

export const getToken = (code) => {
    const {
        token_url,
        client_id,
        client_secret,
        redirect_uri
    } = config.oauth
    const grant_type = 'authorization_code'
    return fetch(`${token_url}`, {
        method: 'POST',
        body: JSON.stringify({
            client_id,
            client_secret,
            code,
            redirect_uri,
            grant_type
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}
