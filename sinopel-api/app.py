from flask import Flask, request
from weasyprint import HTML, CSS
import gzip
import sys

app = Flask(__name__)

def eprint(*args, **kwargs):
	print(*args, file=sys.stderr, **kwargs)

@app.route('/api/v1/pdf', methods=['POST'])
def pdf():
	print('Received POST')
	body = request.data

	# check if Content-Encoding is gzip
	if 'gzip' in request.headers.get('Content-Encoding', ''):
		try:
			print('Decompressing body')
			body = gzip.decompress(request.data)
		except Exception as e:
			eprint(f'Error decompressing body: {e}')
			return f'{{"message": "Error decompressing body", "error": "{e}"}}', 500
	
	body_str = body.decode("utf-8")

	try:
		print('Generating PDF')
		html = None

		# top | right | bottom | left
		css = CSS(string='@page { size: 210mm 330mm; margin: 20mm 0mm 20mm 0mm; } @page :first { margin-top: 0mm; }')

		if body_str.startswith('data:text/html'):
			html = HTML(body_str)
		else:
			html = HTML(string=body_str)

		pdf_bytes = html.write_pdf(stylesheets=[css])
		compressed_bytes = gzip.compress(pdf_bytes)

		return compressed_bytes, 200, {'Content-Type': 'application/pdf', 'Content-Encoding': 'gzip'}
		
	except Exception as e:
		eprint(f'Error generating PDF: {e}')
		return f'{{"message": "Error generating PDF", "error": "{e}"}}', 500

	return 'OK'