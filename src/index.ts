import express, { Request, Response } from 'express';

const app = express();
const port= 3000;

app.get('/', (request: Request, res: Response) => {
    res.status(200).send({"data":"hello world"});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})