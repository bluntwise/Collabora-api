import dotenv from "dotenv";

dotenv.config();

export async function auth(req, res) {

    if (['GET', 'HEAD'].includes(req.method)) {
        return;
    }
    const apiKey = req.headers['x-api-key'];
    const knowKey = process.env.VITE_API_KEY;



    if (!apiKey || apiKey !== knowKey) {

        return res.status(401).send('Not authorized');
    }
}