import App from './app';

(async () => {
    try {
        const PORT: number = 5000;
        await App.listening(PORT);
        console.log(`server listening ${PORT}`);
    } catch(e) {

    }
})()
