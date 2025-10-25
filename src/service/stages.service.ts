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


export const changeStageStatus = async (Id: number, status: string) => {
const stage = await stagesRepository.getStageById(Id);
if (!stage) {
  throw new Error('Stage not found'); 
  
}
await stagesRepository.updateStageStatus(Id, status);
return { message: 'Stage status updated successfully' };
}