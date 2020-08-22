import Server from './server';

const localhostPort = '8535';

const port = process.env.PORT || localhostPort;

Server.app.listen(port, () => {
    console.log(`Server is online on port ${port}`);
});
