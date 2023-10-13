import axios from "axios";

import connect from '../../../lib/mongodb'
import contentList from '../../../model/contentList'

connect();

const content = async (req, res) => {
    const { method } = req;

    switch(method) {
        case 'GET':
            try{
                const list = await contentList.find({});
                res.status(200).json({success: true, data: list})
            } catch(error){
                res.status(400).json({success: false})
            }
            break;

        case 'POST':
            try {
                const list = await contentList.create(req.body);
                res.status(201).json({ success: true, data: list})
            }    
            catch (error){
            
                res.status(400).json({success:false});
            }
            break;
        default: 
            res.status(400).json({success:false});
            break;

            
    }
}

export default content;