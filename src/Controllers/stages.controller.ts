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
  const orderId = parseInt(req.params.Id);
  try {
    const stages = await stagesService.getStagesByOrderId(orderId);
    res.status(200).json(stages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const fetchStageDetails = async (req: Request, res: Response) => {
  const stageId = parseInt(req.params.stageId);
  try {
    const stage = await stagesService.getStageDetails(stageId);
    res.status(200).json(stage);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const updateStage = async (req: Request, res: Response) => {
  const stageId = parseInt(req.params.stageId);
  const { status } = req.body;
  try {
    const result = await stagesService.changeStageStatus(stageId, status);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};