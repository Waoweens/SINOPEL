from flask import Flask, request
from weasyprint import HTML, CSS
import gzip
import sys

app = Flask(__name__)

def eprint(*args, **kwargs):
	print(*args, file=sys.stderr, **kwargs)

styles = """/*! tailwindcss v3.3.3 | MIT License | https://tailwindcss.com*/a,hr{color:inherit}progress,sub,sup{vertical-align:baseline}blockquote,body,dd,dl,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,menu,ol,p,pre,ul{margin:0}dialog,fieldset,legend,menu,ol,ul{padding:0}.max-w-full,img,video{max-width:100%}*,::after,::before{box-sizing:border-box;border:0 solid #e5e7eb;--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::after,::before{--tw-content:''}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal}body{line-height:inherit}hr{height:0;border-top-width:1px}.h-auto,img,video{height:auto}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}menu,ol,ul{list-style:none}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}[hidden]{display:none}::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.-mx-4{margin-left:-1rem;margin-right:-1rem}.-mx-\[15px\]{margin-left:-15px;margin-right:-15px}.my-2{margin-top:.5rem;margin-bottom:.5rem}.my-3{margin-top:.75rem;margin-bottom:.75rem}.mb-0{margin-bottom:0}.mb-0\.5{margin-bottom:.125rem}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.mr-2{margin-right:.5rem}.mt-2{margin-top:.5rem}.mt-4{margin-top:1rem}.inline-block{display:inline-block}.flex{display:flex}.w-24{width:6rem}.flex-1{flex:1 1 0%}.list-decimal{list-style-type:decimal}.list-disc{list-style-type:disc}.list-none,.list-style{list-style-type:none}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.border{border-width:1px}.border-\[2px\]{border-width:2px}.border-\[3px\]{border-width:3px}.pr-1{padding-right:.25rem}.text-center{text-align:center}.text-\[10pt\]{font-size:10pt}.text-\[14pt\]{font-size:14pt}.text-\[15pt\]{font-size:15pt}.font-bold{font-weight:700}.font-semibold{font-weight:600}.not-italic{font-style:normal}.letter-view{all:initial;display:block;box-sizing:border-box;background-color:#fff;width:210mm;min-height:330mm;font-family:'Bookman Old Style',Georgia,Cambria,serif!important;font-size:11 pt}.letter-view>header{padding-top:5mm;padding-right:15mm;padding-left:15mm}.letter-view>footer,.letter-view>section{padding:5mm 20mm 10mm;line-height:1.5;font-size:11pt}.list-style{display:table}.list-style li{display:table-row}.list-style .list-title{display:table-cell;padding-right:1rem}"""

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
		css = CSS(string='@page { size: 210mm 330mm; margin: 20mm 0mm 20mm 0mm; } @page :first { margin-top: 0mm; } ' + styles)

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