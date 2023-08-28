import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  }, 
  midios: {
    type: String,
    required: true
  }, 
  lang: {
    type: String,
    required: true
  }
},
{
  timestamps: true
}
);

const File = mongoose.model('File', fileSchema);

export default File;