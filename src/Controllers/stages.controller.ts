import * as stagesService from '../service/stages.service';
import { Request, Response } from 'express';

export const fetchStages = async (req: Request, res: Response) => {
  try {
    const stages = await stagesService.getStages();
    res.status(200).json(stages);
  } catch (error) {
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const fetchStagesByOrderId = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.orderId);
  try {
    const stages = await stagesService.getStagesByOrderId(orderId);
    res.status(200).json(stages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

