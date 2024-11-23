import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

interface RefreshTokenPayload extends JwtPayload {
    id: ObjectId
}

export default RefreshTokenPayload;