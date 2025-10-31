import express from 'express';
import { webhookController } from '../../infrastructure/di/diContaier';
const router = express.Router();

router.post("/subscription/webhook",express.raw({ type: 'application/json' }),(req, res, next) => {webhookController.handle(req, res, next)});

export {router as webHookRouter }