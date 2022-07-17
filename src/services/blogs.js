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
	const newUrl = baseUrl + "/" + newObject.user;
	const response = await axios.put(newUrl, newObject, config);
	return response.data;
};

const remove = async (newObject, userObject) => {
	try {
		const config = { Authorization: token, "Content-Type": "application/json" };
		const newUrl = baseUrl + "/" + newObject.id;
		const response = await axios.delete(newUrl, { headers: config, data: userObject });
		return response;
	} catch (error) {
		console.error(error);
		return 401;
	}
};

const toExport = { getAll, create, update, remove, setToken };
export default toExport;
