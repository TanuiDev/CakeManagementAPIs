import * as stagesRepository from '../../src/repositories/stages.repository';
import * as stagesService from '../../src/service/stages.service';
jest.mock("../../src/repositories/stages.repository")



describe("Order stages test Suites",()=>{

     afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should fetch all the orders stages",async()=>{
    const mockStages=[
      {
             OrderId: 2006,
        StageName: "Baking",
        Status: "Completed",
        StartedAt: "2025-10-20T09:00:00.000Z",
        
        Notes: "Baked successfully."
      },
      {
             OrderId: 2006,
        StageName: "Decorating",
        Status: "In Progress",
        StartedAt: "2025-10-20T12:00:00.000Z",
        CompletedAt: null,
        Notes: "Adding final touches."
      }
    ];
    
    (stagesRepository.getAllStages as jest.Mock).mockResolvedValue(mockStages);
    const res = await  stagesService.getStages();
    expect(res).toEqual(mockStages);

  })

  it("Should fetch stages by order id",async()=>{
    const mockStagesByOrderId={
             OrderId: 2006,
        StageName: "Baking",
        Status: "Completed",
        StartedAt: "2025-10-20T09:00:00.000Z",
        CompletedAt: "2025-10-20T10:00:00.000Z",
        Notes: "Baked successfully."
      };

      (stagesRepository.getStageById as jest.Mock).mockResolvedValue(mockStagesByOrderId);

      const res = await stagesService.getStageDetails(2006);
      expect(res).toEqual(mockStagesByOrderId);

    })

    it("Should fail with nonexistent stage Id", async()=>{
      
      
      (stagesRepository.getStageById as jest.Mock).mockResolvedValue(null)

      
      await expect(stagesService.getStageDetails(2000009))
      .rejects
      .toThrow("Stage not found")
    })



   


})