import * as designRepo from "../repositories/design.repository";
import { Design } from "../types/design.types";

//  Fetch all designs
export const listDesigns = async () => {
  return await designRepo.getAllDesigns();
};

//  Find design by ID
export const findDesign = async (id: number) => {
  const design = await designRepo.getDesignById(id);
  if (!design) throw new Error("Design not found");
  return design;
};

//  Create design
export const addDesign = async (designData: Design) => {
  if (!designData.DesignName || !designData.BaseFlavor || !designData.Size) {
    throw new Error("All fields required!!!!");
  }

  await designRepo.createDesign(designData);
};

//  Update design
export const modifyDesign = async (DesignID: number, designData: Design) => {
  const existing = await designRepo.getDesignById(DesignID);
  if (!existing) throw new Error("Design not found");
  await designRepo.updateDesign(designData);
};

//  Delete design
export const removeDesign = async (id: number) => {
  const existing = await designRepo.getDesignById(id);
  if (!existing) throw new Error("Design not found");
  await designRepo.deleteDesign(id);
};
