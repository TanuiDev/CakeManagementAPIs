import * as stagesRepository from '../repositories/stages.repository';


export const getStages = async () => {
  return await stagesRepository.getAllStages();
}
