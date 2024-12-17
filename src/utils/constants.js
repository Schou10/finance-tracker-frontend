const APIkey = "26c560704199d0488af039d6d7be01c9"

const baseUrl = process.env.NODE_ENV === "production" ?
  "https://api.finance-tracker.zanity.net" || "https://www.finance-tracker.zanity.net" ||"https://finance-tracker.zanity.net"
  : "http://localhost:3001";

export { APIkey, baseUrl}