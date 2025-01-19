export const indexContent = `
import express from 'express';
import cors from 'cors';

import { config } from './config/config';
import { errorHandler } from './middleware/error-handler';
import { router } from './routes/routes'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
  `.trim()
