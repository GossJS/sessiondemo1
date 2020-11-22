import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fs from 'fs';

import appSrc from './app.js';

const app = appSrc(express, bodyParser, fs, cookieParser);

app.listen(process.env.PORT ?? 3000);
