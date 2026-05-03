import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { FileUp, CheckCircle } from 'lucide-react';

interface UploadBoxProps {
  onFile: (file: File) => void;
}

export default function UploadBox({ onFile }: UploadBoxProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'text/csv': ['.csv'] },
    onDrop: files => {
      if (files[0]) {
        setFileName(files[0].name);
        onFile(files[0]);
      }
    }
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 bg-lokal-dark ${
        isDragActive ? 'border-lokal-green bg-lokal-green/5' : 'border-lokal-mid'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex justify-center mb-4">
        {fileName ? (
          <CheckCircle className="w-10 h-10 text-lokal-green" />
        ) : (
          <FileUp className={`w-10 h-10 ${isDragActive ? 'text-lokal-green' : 'text-lokal-muted'}`} />
        )}
      </div>
      {fileName ? (
        <p className="text-lokal-green font-bold text-sm">✓ {fileName}</p>
      ) : (
        <>
          <p className="text-lokal-white font-bold text-base mb-1.5 uppercase tracking-wide">
            Drop your customer CSV here
          </p>
          <p className="text-lokal-muted text-xs uppercase tracking-widest">
            or click to browse — supports .csv files
          </p>
        </>
      )}
    </div>
  );
}
