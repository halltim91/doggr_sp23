import axios from "axios";
import jwt from "jsonwebtoken";

const getTokens = async () => {
	const api = await axios.get(
		"https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
	);

	if (api.status === 200)
		return api.data;

	return {};
};

const secureTokens = await getTokens();

const verifyToken = (token, uid) => {
	if (!token)
		throw new Error("No user token provided");

	if (!uid)
		throw new Error("No user uid provided");

	try {
		const header64 = token.split(".")[0];
		const header = JSON.parse(
			Buffer.from(header64, "base64").toString("ascii")
		);
		const secret = secureTokens[header.kid];

		return jwt.verify(token, secret, {
			algorithms: ["RS256"],
			audience: process.env.FB_PROJ_ID,
			issuer: `https://securetoken.google.com/${process.env.FB_PROJ_ID}`,
			subject: uid,
		}).uid;
	} catch (error) {
		throw new Error("Invalid user authentication token", error);
	}
};

export default verifyToken;
