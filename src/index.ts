//imports
    import express, { Request, Response, NextFunction} from 'express';
    import { URLController } from './routes/UrlControler';
    import { MongooseConection } from './database/MongoConection';

//config
    const api = express()
    api.use(express.json())
    api.use(express.urlencoded({extended: true}))

    const database = new MongooseConection()
    database.connect()
    
//rotas
    const urlController = new URLController()
    api.post('/shorten', urlController.shorten)
    api.get("/:hash", urlController.redirect)
    
api.listen(5000, ()=> console.log("Express listening port: 5000"))
