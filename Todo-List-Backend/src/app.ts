import 'reflect-metadata';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express().disable('etag').disable('x-powered-by');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const IS_DEV = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

if (IS_DEV) {
  app.use(cors());
}

export { app };
