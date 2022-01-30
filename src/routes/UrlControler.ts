import { Request, response, Response } from "express";
import shortid from "shortid";
import { config } from "../Config/Constant";
import Schema from '../database/model/Schema';
import mongoose from 'mongoose'

//model dados
const model = mongoose.model("dados", Schema);

export class URLController {
    public async shorten(req: Request, res: Response): Promise<void>{
        const { originURL } = req.body
        const hash: string = shortid.generate()
        const shortURL: string = `${config.API_URL}/${hash}`
        const url = {originURL, hash, shortURL}
        model.findOne({originURL: originURL}).then((find)=>{
            if (originURL === undefined){
                console.error("originURL não definido")
            } else if(find.length==0){
                console.log("não existe, criar nova")
                model.create({ originURL, hash, shortURL })
            } else {
                console.log("existe sim boy")
                url.originURL = find.originURL
                url.hash = find.hash
                url.shortURL = find.shortURL
            }
            res.json(url)
        })
        
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        const { hash } = req.params
        model.findOne({hash}).then((find)=>{
            res.redirect(find.originURL)
        }) 
    } 
}