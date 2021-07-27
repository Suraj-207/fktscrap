from flask import Flask, request, send_from_directory
from flask_restful import Api,Resource
from flask_cors import CORS
import os
from py_backend.flipkart.product_extractor import Product

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)
api = Api(app)


class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

    def post(self):
        val = request.get_json()['formData']['name']
        product = Product(val)
        result = product.get_details()
        print(result)
        return {"result": result}


@app.route('/', defaults={'path': ''})
def home_page(path):
    return send_from_directory(app.static_folder,'index.html')


api.add_resource(HelloWorld, '/find-item')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port, debug=True)
