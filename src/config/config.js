const config = {
    oauth: {
        client_id: '3a6b95ce61803b2149517f6730c5d14376ce2a32',
        client_secret: '76ceb294d4df84b8364e915cda4c82bb794547b4',
        redirect_uri: 'http://localhost:7000/login/callback',
        login_url: 'https://gitter.im/login/oauth/authorize',
        token_url: 'https://gitter.im/login/oauth/token'
    },
    faye: {
        endpoint: 'https://ws.gitter.im/faye',
        timeout: 60,
        retry: 5,
        interval: 1
    }
}

export default config