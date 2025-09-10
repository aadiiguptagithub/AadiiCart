import User from "../model/userModel.js";

export const getCurrentUser =async (req, res) => {
    try{
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({user});

    }catch(error){
        console.log("Get current user error:", error);
        res.status(500).json({message: "Error fetching user", error});
    }
}


export const getAdmin = async (req, res) => {
    try {
        let adminEmail = req.adminEmail;
        if(!adminEmail){
            return res.status(401).json({ message: "Unauthorized" });
        }
            return res.status(404).json({ message: "Admin not found" });
         
    } catch (error) {
        console.log("Get admin error:", error);
        res.status(500).json({ message: "Error fetching admin", error });
    }
}
