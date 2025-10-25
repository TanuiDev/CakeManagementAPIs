import * as stagesRepository from '../repositories/stages.repository';


export const getStages = async () => {
  return await stagesRepository.getAllStages();
}


export const getStagesByOrderId = async (orderId: number) => {

  return await stagesRepository.getOrderStages(orderId);
}

export const getStageDetails = async (stageId: number) => {
  return await stagesRepository.getStageById(stageId);
}
