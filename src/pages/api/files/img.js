import multer from "multer";

const upload = multer({
	storage: multer.diskStorage({
		destination: "./public/uploads",
		filename: (req, file, cb) => {
			cb(
				null,
				`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
			);
		},
	}),
});

export default function handler(req, res) {
	console.log(req.body);
	upload.single("image")(req, res, (err) => {
		if (err) {
			console.error(err);
			res.status(500).end("Error al cargar la imagen");
		} else {
			console.log(req.file);
			res.end("Imagen subida correctamente");
		}
	});
}
