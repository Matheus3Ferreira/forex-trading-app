import { Request, Response } from "express";
import User from "../../users/models/user";
import Trade from "../models/trades";


export default class TradeController {
    public async create(request: Request, response: Response): Promise<Response> {

        const {openPrice, volume, type} = request.body;

        const userEmail = request.params.email;
        
        if (!openPrice)
            throw new Error("Invalid open price");
            
        if (!volume || volume < 0.01 || volume > 100)
            throw new Error("Invalid volume");
        
        if (!type || type != "sell" && type != "buy")
            throw new Error("Invalid type")
        
        if (!userEmail)
            throw new Error("Invalid user email");    
            
        const user = await User.findOne({email: userEmail});
        
        if (!user) 
            throw new Error("User not found");

        const trade = await Trade.create(request.body);
      
        if (!trade)
            throw new Error("Registration Failed.");

        await trade.save();

        user.trades?.push(trade);

        user.save();

        return response.status(201).json(trade);

    }
}

