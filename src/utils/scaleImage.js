export default function scaleImage(inputImage, width = 350, height = 350) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = inputImage;

		img.onload = () => {
			const newWidth = width;
			const newHeight = height;

			console.log("reduciendo imagen:", img.width, "to", 300);

			const aspectRatio = img.width / img.height;
			let scaledWidth = newWidth;
			let scaledHeight = newHeight;
			if (aspectRatio > 1) {
				scaledHeight = scaledWidth / aspectRatio;
			} else {
				scaledWidth = scaledHeight * aspectRatio;
			}

			const canvas = document.createElement("canvas");
			canvas.width = scaledWidth;
			canvas.height = scaledHeight;

			const ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

			const scaledBase64 = canvas.toDataURL();

			resolve(scaledBase64);
		};

		img.onerror = (error) => {
			reject(error);
		};
	});
}
