import jwt from "jsonwebtoken"
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config()
admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_DOMAIN,
  })
});
const fetchuer=async(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1]
        const token2= req.header("auth-token");
         console.log(token);
         console.log(token2);
        if (token){
            const decoded = await admin.auth().verifyIdToken(token);
            req.email=decoded.email;
            console.log(decoded);
            next();
        } 
        if(token2){
            const data= jwt.verify(token2,process.env.JWT_SERECT)
            console.log(data);
            next();
        }

        if(!token && !token2 ) return res.status(401).send("No token");

    } catch (error) {
        console.log(error)
         return res.status(500).json({"error":"Intarnal server error"})
    }
}

export default fetchuer;