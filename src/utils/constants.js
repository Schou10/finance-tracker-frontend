const APIkey = "26c560704199d0488af039d6d7be01c9"

const baseUrl = process.env.NODE_ENV === "production" ?
  "https://api.FT.zanity.net" || "https://www.FT.zanity.net" ||"https://FT.zanity.net"
  : "http://localhost:3001";

export { APIkey, baseUrl}