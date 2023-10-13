import connect from '../../../lib/mongodb'
import userList from '../../../model/userList'
import contentOp from '../content/[id]';

connect();

const userLists = async (req, res) => {
    const { method } = req;

    switch(method) {
        case 'GET':
            try{
                const list = await userList.find({});
                res.status(200).json({success: true, data: list})

            } catch(error){
                res.status(400).json({success: false})
            }
            break;

        case 'POST':
            try {
                const userEmail = await userList.findOne({ studenId:req.body.studentId });
                const userName = await userList.findOne({studentName:req.body.studentName})
                console.log(userEmail+"server check")
                console.log(userEmail+"server check")
                if(userEmail===null&&userName===null){
                    const list = await userList.create(req.body);
                    res.status(201).json({ success: true, data: list})
                }
                else{
                    res.status(202).json({success:false,exists:true })
                }
            }    
            catch (error){
            
                res.status(400).json({success:false});
            }
            break;
        case 'PUT':
            try{
                console.log(req.body._id)
                const list= await userList.replaceOne({_id:req.body._id},req.body)
                res.status(200).json({success:true,data:list})
            }
            catch (error){
                res.status(400).json({success:false})
            }
        default: 
            res.status(400).json({success:false});
            break;

            
    }
}

export default userLists;