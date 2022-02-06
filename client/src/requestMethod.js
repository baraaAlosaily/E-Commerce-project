import axios from "axios";

let TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjVhYTlhYTE1MmUyMGNiOGRhZWUwNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MzcwNjYxNSwiZXhwIjoxNjQzOTY1ODE1fQ.tenkFQOjBpmgkd_gy-Pt1cPOBOQQVktulL-FdzY_yqI";

const BASE_URL="http://localhost:5000/api/";

if(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser==null){
    TOKEN="";
}else{
    TOKEN=JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
}

export const publicRequest=axios.create({
    baseURL:BASE_URL,
});

export const userRequest=axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
})