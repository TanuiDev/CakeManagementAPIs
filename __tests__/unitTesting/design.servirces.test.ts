import * as designRepo from "../../src/repositories/design.repository";
import * as designService from "../../src/service/design.service";


jest.mock("../../src/repositories/design.repository");

describe("Design Service", () => {
  const mockDesign = {
    Id: 1,
    DesignName: "Chocolate Delight",
    Description: "Rich chocolate base with frosting",
    BaseFlavor: "Chocolate",
    Availability: 1,
    Size: "Medium",
    imageUrl: "chocolate.jpg",
    category: "Birthday",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  
  it("should return all designs", async () => {
    (designRepo.getAllDesigns as jest.Mock).mockResolvedValue([mockDesign]);

    const result = await designService.listDesigns();

    expect(result).toEqual([mockDesign]);
    expect(designRepo.getAllDesigns).toHaveBeenCalledTimes(1);
  });

  
  it("should return a design by ID", async () => {
    (designRepo.getDesignById as jest.Mock).mockResolvedValue(mockDesign);

    const result = await designService.findDesign(1);

    expect(result).toEqual(mockDesign);
    expect(designRepo.getDesignById).toHaveBeenCalledWith(1);
  });

  
  it("should throw an error if design not found", async () => {
    (designRepo.getDesignById as jest.Mock).mockResolvedValue(null);

    await expect(designService.findDesign(999)).rejects.toThrow("Design not found");
    expect(designRepo.getDesignById).toHaveBeenCalledWith(999);
  });

 
  it("should call createDesign with correct arguments", async () => {
  
    (designRepo.createDesign as jest.Mock).mockResolvedValue(undefined);

    await designService.addDesign(mockDesign as any);
    expect(designRepo.createDesign).toHaveBeenCalledWith(
      mockDesign as any
    );
  });

 
  it("should update an existing design", async () => {
    const updatedDesign = {
      ...mockDesign,
      designName: "Updated Design",
    };
    (designRepo.getDesignById as jest.Mock).mockResolvedValue(mockDesign);
    (designRepo.updateDesign as jest.Mock).mockResolvedValue(undefined);

    await designService.modifyDesign(1, updatedDesign as any);

    expect(designRepo.getDesignById).toHaveBeenCalledWith(1);
    
  });

 
  it("should throw an error if design to update is not found", async () => {
    (designRepo.getDesignById as jest.Mock).mockResolvedValue(null);

    await expect(
      designService.modifyDesign(1, mockDesign as any)
    ).rejects.toThrow("Design not found");
    expect(designRepo.updateDesign).not.toHaveBeenCalled();
  });

  
  it("should delete an existing design", async () => {
    (designRepo.getDesignById as jest.Mock).mockResolvedValue(mockDesign);
    (designRepo.deleteDesign as jest.Mock).mockResolvedValue(undefined);

    await designService.removeDesign(1);

    expect(designRepo.getDesignById).toHaveBeenCalledWith(1);
    expect(designRepo.deleteDesign).toHaveBeenCalledWith(1);
  });

  
  it("should throw an error if design to delete is not found", async () => {
    (designRepo.getDesignById as jest.Mock).mockResolvedValue(null);

    await expect(designService.removeDesign(1)).rejects.toThrow("Design not found");
    expect(designRepo.deleteDesign).not.toHaveBeenCalled();
  });
});
