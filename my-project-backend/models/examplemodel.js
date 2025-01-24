// models/ExampleData.js
import mongoose from 'mongoose';

const ExampleDataSchema = mongoose.Schema({
  first_name: { type: String},
  last_name: { type: String},
  gender: { type: String}
});

const ExampleData = mongoose.model('examplemodel', ExampleDataSchema, 'examplemodel'); 

export default ExampleData;
