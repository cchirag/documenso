import React from 'react';

import QR from 'react-qr-code';

interface QRCodeProps {
  value: string;
  height: string;
  width: string;
  blur: boolean;
}

export const QRCode = (props: QRCodeProps) => {
  const { blur, height, value, width } = props;
  return (
    <div className={`h-fit w-fit ${blur && 'blur-2xl'}`}>
      <QR
        value={value}
        style={{
          width: width,
          height: height,
        }}
      />
    </div>
  );
};
