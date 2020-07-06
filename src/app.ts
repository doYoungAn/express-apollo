import express, { Express } from 'express';

class App {

    private _express: Express;

    constructor() {
        this._express = express();
    }

    public listening(port: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this._express.listen(port, () => {
                resolve();
            });
        });
    }
}

const app = new App();

export default app;
