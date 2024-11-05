import { Request, Response } from "express";

const handleTest = async (req: Request, res: Response) => {
  res.send({ message: "Une route de test!" });
};

export default { handleTest };