from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS
import os
from py_backend.API.product_extract_api import FetchProduct
from py_backend.API.product_review_api import FetchReview, SendReview

app = Flask(__name__, static_url_path='', static_folder='/frontend/build')
CORS(app)
api = Api(app)


@app.route('/', defaults={'path': ''})
def home_page(path):
    return send_from_directory(app.static_folder,'index.html')


api.add_resource(FetchProduct, '/find-item')
api.add_resource(FetchReview, '/review')
api.add_resource(SendReview, '/fetch-review')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port, debug=True)
