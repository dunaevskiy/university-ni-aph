let fs = require('fs'),
	PNG = require('pngjs').PNG;

const arg = process.argv;

if (arg.length !== 4) exit(5);
const [, , source, output] = arg;

fs.createReadStream(source)
	.pipe(
		new PNG({
			filterType: 4,
		}),
	)
	.on('parsed', function () {
		let map = [];

		for (let y = 0; y < this.height; y++) {
			let mapRow = [];
			for (let x = 0; x < this.width; x++) {
				let idx = (this.width * y + x) << 2;
				// mapRow.push(`${this.data[idx]}`.padStart(3, '0'));
				mapRow.push(this.data[idx]);
			}

			map.push(mapRow);
		}

		const jsonContent = JSON.stringify(map);

		fs.writeFile(output, jsonContent, 'utf8', function (err) {
			if (err) {
				console.log('An error occured while writing JSON Object to File.');
				return console.log(err);
			}

			console.log('JSON file has been saved.');
		});
	});
