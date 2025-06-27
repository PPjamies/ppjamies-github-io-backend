import express from 'express';
import rateLimit from 'express-rate-limit';
import contactRoutes from './routes/contact-routes';
import globalErrorHandler from './middleware/globalErrorHandler';

const app = express();

app.use(express.json());
app.use(rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3
}));
app.use('/contact', contactRoutes);
app.use(globalErrorHandler);

app.listen(3000);