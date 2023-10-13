import connect from '../../../lib/mongodb'
import userList from '../../../model/userList'
import contentOp from '../content/[id]';

connect();

const active = async (req, res) => {
    const {method}=req;

switch(method){
    case 'POST':
        try{
            
            const list=await userList.updateOne({studentId:req.body.studentId},{$set:{
                status:req.body.status
            }})
            res.json({success: true, data: list})
        }
        catch(error){
            console.log(error)
            res.status(400)
        }
        break;
    default: 
        res.status(400).json({success:false});
        break;
    }

    
}

export default active;