import axios from '../axios';
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login',{
        email:userEmail,
        password:userPassword,
    });
}
const getAllUsers = (id)=>{
    return axios.get(`/api/get-all-users?id=${id}`);
}
const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`,data);
}
const deleteUserService = (id) => {
    return axios.delete(`/api/delete-user`,{
          data: {
            id: id
          }
    });
}
const editUserService = (data) => {
    return axios.put(`/api/edit-user`,data);
}
const getAllCodeServices = (data) =>{
    return axios.get(`/api/allcode?type=${data}`);
}
const getTopDoctorHomeService = (limit) =>{
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () =>{
    return axios.get(`/api/get-all-doctor`)
}
const saveDetailsDoctor = (data) => {
    return axios.post(`/api/save-info-doctors`,data);
} 
const getDetailInfoDoctors = (id) =>{
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}
export  {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeServices,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailsDoctor,
    getDetailInfoDoctors
};
