import commonAPI from "./commonAPI";
import SERVERURL from "./serverurl";

export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/register`,reqBody)
}

export const getAllUserDetails = async ()=>{
    return await commonApi("GET",`${serverUrl}/users`,"")
}