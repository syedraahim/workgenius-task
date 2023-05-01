from flask import Flask, request, jsonify
import os
import uuid
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    filename = str(uuid.uuid4()) + '.' + file.filename.split('.')[-1]
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return jsonify({'id': filename}), 201


@app.route('/images', methods=['GET'])
def get_images():
    images = os.listdir(app.config['UPLOAD_FOLDER'])
    return jsonify({'images': images}), 200

if __name__ == '__main__':
    app.run()
