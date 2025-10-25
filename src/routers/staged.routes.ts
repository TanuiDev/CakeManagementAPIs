import * as stagesController from '../Controllers/stages.controller';



export const registerStageRoutes = (app: any) => {
  app.get('/stages', stagesController.fetchStages);
};