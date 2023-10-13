
import connect from '../../../lib/mongodb'
import contentList from '../../../model/contentList';

connect();

const contentOp= async (req, res) => {
    const { query: { id }, method } = req;

    switch (method) {
        case 'GET':
            try {
                const list = await contentList.findbyId(id);
                if(!list){
                    res.status(400).json({ success: false })

                }
                res.status(200).json({ success: true, data: list })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;

        case 'PUT':
            try {
                const updateList = await contentList.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                if (!updateList) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: updateList });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

         case 'DELETE':
            try {
                const deleteList = await contentList.deleteOne({_id: id});
                if(!deleteList) {
                    res.status(400).json({success:false})
                }
                res.status(200).json({ success: true, data: {} });

            }   catch (error) {
                res.status(400).json({ success: false });

            }
            break;
        default:
            res.status(400).json({ success: false });
            break;

    }
      
}

export default contentOp;