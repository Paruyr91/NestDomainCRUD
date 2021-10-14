import * as dotenv from 'dotenv';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI;
 