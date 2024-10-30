import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const Scanner: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = async (imageData: string | File) => {
    setIsProcessing(true);
    try {
      // Implementation for image processing will go here
      toast.success('Image processed successfully!');
    } catch (error) {
      toast.error('Failed to process image. Please try again.');
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCapture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      processImage(imageSrc);
      setShowCamera(false);
    }
  }, [webcamRef]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Scan Food Items
        </h1>

        {!showCamera ? (
          <div className="space-y-4">
            <button
              onClick={() => setShowCamera(true)}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Camera size={20} />
              <span>Take Photo</span>
            </button>

            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Upload size={20} />
                <span>Upload Image</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleCapture}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Capture
              </button>
              <button
                onClick={() => setShowCamera(false)}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg flex items-center space-x-2">
              <Loader className="animate-spin" />
              <span>Processing image...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;