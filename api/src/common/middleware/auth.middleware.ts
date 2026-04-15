import { Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt"

export const authenticate = (
    req: any,
    res: Response,
    next: NextFunction
) => {

    const token =
        req.headers.authorization?.split(" ")[1]

    if (!token) return res.status(401).send("Unauthorized")

    try {
        const decoded = verifyToken(token)
        req.user = decoded
    } catch {
        return res.status(401).send("Unauthorized")
    }

    next()
}