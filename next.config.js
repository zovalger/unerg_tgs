const withTM = require("next-transpile-modules")(["reactstrap"]);

module.exports = withTM({
	reactStrictMode: true,
	/* configuración adicional aquí */
});
