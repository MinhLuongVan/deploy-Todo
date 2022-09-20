const clientUrl = import.meta.env.VITE_CLIENT_URL;
const serverUrl = import.meta.env.VITE_SERVER_URL;
//Setup môi trường
export const env = {
    hostClient: clientUrl,
    hostServer: serverUrl,
};
