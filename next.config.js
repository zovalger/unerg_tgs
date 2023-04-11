// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig



const withTM = require("next-transpile-modules")(["reactstrap"]);

module.exports = withTM({
	reactStrictMode: true,
	/* configuración adicional aquí */
});
