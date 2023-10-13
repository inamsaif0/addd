import connect from "../../../lib/mongodb";
import User from '../../../model/schema';

// connect();

// export default async (req, res) => {
//     const { method } = req;

//     switch (method) {
//         //For Log in
//         case 'GET':
//             try {
//                 const user = await User.find({});
//                 res.status(200).json({ success: true, data: user })
//             } catch (error) {
//                 res.status(400).json({ success: false })
//             }
//             break;

//             //for Registeration
//         case 'POST':
//             try {
//                 const user = await User.create(req.body);
//                 res.status(201).json({ success: true, data: user });
//             } catch (error) {
//                 res.status(400).json({ success: false })
//             }
//     }
//     // const {email,password}=req.body
//     // const user = await User.findOne({email,password})
//     // if(!user)
//     // {
//     //     return res.json({status:'Not able to find the user'})
//     // }
//     // else{
//     //     res.redirect('/dashboard')
//     // }
// }   
// import clientPromise from '../../../lib/mongo/index'
import { pbkdf2Sync } from 'crypto';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next'

export default async function AdminAuth(req,res){
    if(req.method === 'POST'){
        const client = await connect();

        const { email , password } = req.body;
        // const hashPassword = pbkdf2Sync(password,'f844b09ff50c',1000,64,'sha256').toString('hex')

        const result = await User.findOne({
            $and : [
                {
                    email : email
                },
                {
                    password : password
                }
            ]
        })
        console.log(result)
        if(result!==null){
            res.json({
                success : true,
                data:result
            })
            return;
        }
        else {
            res.json({
            success : false
        })
        return;
    }
    }
}