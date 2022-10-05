import axios from "axios";
const baseUrl = "/api/users";

const getUsers = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const register = async (newUser) => {
	const newUrl = baseUrl + "/register";
	const response = await axios.post(newUrl, newUser);
	return response.data;
};

const toExport = { getUsers, register };
export default toExport;
