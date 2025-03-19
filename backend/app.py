from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Path to the data file
data_file_path = os.path.join(os.path.dirname(__file__), './store/data.json')

# Load properties data from JSON file
with open(data_file_path) as f:
    properties = json.load(f)

# Fallback image URL for properties without a valid image URL
FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"

# Route to fetch all properties
@app.route('/api/properties', methods=['GET'])
def get_properties():
    for property in properties:
        if not property.get('image_url') or 'random' in property.get('image_url', ''):
            property['image_url'] = FALLBACK_IMAGE
    return jsonify(properties)

# Route to fetch a specific property by ID
@app.route('/api/properties/<int:id>', methods=['GET'])
def get_property(id):
    property = next((p for p in properties if p['id'] == id), None)
    if not property:
        return jsonify({'error': 'Property not found'}), 404
    
    # Ensure property has valid image URL
    if not property.get('image_url') or 'random' in property.get('image_url', ''):
        property['image_url'] = FALLBACK_IMAGE
    
    return jsonify(property)

# Route to create a new property (POST request)
@app.route('/api/properties', methods=['POST'])
def create_property():
    new_property = request.json
    if not all(key in new_property for key in ('name', 'price', 'location', 'bedrooms', 'bathrooms')):
        return jsonify({'error': 'Missing required fields'}), 400
    
    new_property['id'] = max(p['id'] for p in properties) + 1
    
    if not new_property.get('image_url'):
        new_property['image_url'] = FALLBACK_IMAGE
    
    properties.append(new_property)
    
    # Save updated properties data back to the JSON file
    with open(data_file_path, 'w') as f:
        json.dump(properties, f)
    
    return jsonify(new_property), 201

# Route to update an existing property by ID (PUT request)
@app.route('/api/properties/<int:id>', methods=['PUT'])
def update_property(id):
    property = next((p for p in properties if p['id'] == id), None)
    if not property:
        return jsonify({'error': 'Property not found'}), 404
    
    data = request.json
    property.update(data)
    
    if not property.get('image_url') or 'random' in property.get('image_url', ''):
        property['image_url'] = FALLBACK_IMAGE
    
    # Save updated properties data back to the JSON file
    with open(data_file_path, 'w') as f:
        json.dump(properties, f)
    
    return jsonify(property)

# Route to delete a specific property by ID (DELETE request)
@app.route('/api/properties/<int:id>', methods=['DELETE'])
def delete_property(id):
    global properties
    properties = [p for p in properties if p['id'] != id]
    
    # Save updated properties data back to the JSON file
    with open(data_file_path, 'w') as f:
        json.dump(properties, f)
    
    return '', 204

# Main entry point of the application
if __name__ == '__main__':
    # Bind to PORT environment variable provided by Render, defaulting to 5000 locally
    port = int(os.environ.get('PORT', 5000))
    
    # Run the app on host='0.0.0.0' and the specified port
    app.run(host='0.0.0.0', port=port, debug=True)
