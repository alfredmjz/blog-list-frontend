import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

const update = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};
	console.log(newObject);
	const newUrl = baseUrl + "/" + newObject.user.id;
	const response = await axios.put(newUrl, newObject, config);
	return response.data;
};

const toExport = { getAll, create, update, setToken };
export default toExport;
