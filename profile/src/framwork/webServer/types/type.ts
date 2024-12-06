export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export interface CLoudineryResult {
  public_id: string;
  secure_url: string;
}

interface FileData {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export interface Req {
  bodyData: {
    name: string;
    email: string;
    qualification: string;
    experience: string;
    certificate: string;
    cv: string;
  },
  fileData:{
   
  }
}

