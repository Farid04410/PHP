const form = document.querySelector('#converter-form');
		const select = document.querySelector('#format');
		const convertBtn = document.querySelector('input[type=submit]');

		form.addEventListener('submit', function(event) {
			event.preventDefault();
			
			const file = document.querySelector('#file').files[0];
			const format = select.value;
			
			const formData = new FormData();
			formData.append('file', file);
			formData.append('format', format);
			
			convertBtn.disabled = true;
			
			fetch('converter.php', {
				method: 'POST',
				body: formData
			})
			.then(response => response.blob())
			.then(blob => {
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `converted.${format}`;
				document.body.appendChild(a);
				a.click();
				a.remove();
				URL.revokeObjectURL(url);
			})
			.catch(error => console.error(error))
			.finally(() => convertBtn.disabled = false);
		});