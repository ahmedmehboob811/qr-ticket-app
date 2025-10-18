import React, { useEffect } from 'react';
import { Html5QrcodeScanner, QrcodeSuccessCallback, QrcodeErrorCallback, Html5QrcodeResult } from 'html5-qrcode';

interface QrScannerProps {
  onScanSuccess: (decodedText: string, decodedResult: Html5QrcodeResult) => void;
  onScanFailure?: QrcodeErrorCallback;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanSuccess, onScanFailure }) => {
  useEffect(() => {
    // We are disabling the ESLint rule here because we only want this effect to run once on mount,
    // and the library manages its own state internally. Including the callbacks in the dependency array
    // could cause the scanner to re-render unnecessarily.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
      },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    return () => {
      html5QrcodeScanner.clear().catch(error => {
        console.error("Failed to clear html5-qrcode-scanner.", error);
      });
    };
  }, []);

  return <div id="qr-reader" className="w-full"></div>;
};

export default QrScanner;
