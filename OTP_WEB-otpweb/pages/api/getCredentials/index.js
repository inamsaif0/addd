import connect from '../../../lib/mongodb'
import userList from '../../../model/userList'

connect();

const userLists = async (req, res) => {

            try{
                const list = await userList.findOne({studentId:req.body.studentId});
                res.json({success: true, data: list})

            } catch(error){
                res.status(400).json({success: false})
            }
            
            
    }


export default userLists;