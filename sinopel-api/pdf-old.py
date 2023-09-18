from http.server import BaseHTTPRequestHandler

from weasyprint import HTML, CSS
import gzip
import sys

def eprint(*args, **kwargs):
	print(*args, file=sys.stderr, **kwargs)

class handler(BaseHTTPRequestHandler):
	def do_GET(self):
		print('GET request received')
		self.send_response(501)
		self.send_header('Content-type', 'application/json')
		self.end_headers()
		self.wfile.write(b'{"message": "GET method not implemented"}')

	def do_POST(self):
		print('POST request received')
		content_length = int(self.headers['Content-Length'])
		body = self.rfile.read(content_length)

		# check if body is gzip encoded
		if 'gzip' in self.headers.get('Content-Encoding', ''):
			try:
				print('Decompressing body')
				body = gzip.decompress(body)
			except Exception as e:
				eprint(f'Error decompressing body: {e}')
				self.send_response(500)
				self.send_header('Content-type', 'application/json')
				self.end_headers()
				self.wfile.write(f'{{"message": "Error decompressing body", "error": "{e}"}}'.encode("utf-8"))
				return

		body_str = body.decode("utf-8")
		# print(body_str)

		try:
			print('Generating PDF')
			html = None
			css = CSS(string='@page { size: 210mm 330mm; margin: 0mm 0mm 0mm 0mm; }')

			if body_str.startswith('data:text/html'):
				html = HTML(body_str)
			else:
				html = HTML(string=body_str)

			pdf_bytes = html.write_pdf(stylesheets=[css])
			compressed_bytes = gzip.compress(pdf_bytes)

			# with open("/home/waoweens/Downloads/debug_gzipped_data", "wb") as f:
			# 	f.write(compressed_bytes)

			self.send_response(200)
			self.send_header('Content-type', 'application/pdf')
			self.send_header('Content-Encoding', 'gzip')
			self.end_headers()
			
			self.wfile.write(compressed_bytes)
			
		except Exception as e:
			eprint(f'Error generating PDF: {e}')
			self.send_response(500)
			self.send_header('Content-type', 'application/json')
			self.end_headers()
			self.wfile.write(f'{{"message": "Error generating PDF", "error": "{e}"}}'.encode("utf-8"))