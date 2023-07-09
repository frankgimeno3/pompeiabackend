import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  dios: {
    type: String,
    required: true
  }, 
},
{
  timestamps: true
}
);

const File = mongoose.model('File', fileSchema);

export default File;