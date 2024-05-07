'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { socket } from '@documenso/sync-sign';
import { SignaturePad } from '@documenso/ui/primitives/signature-pad';

export default function SignSyncPage() {
  const params = useParams();

  const [signatureValue, setSignatureValue] = useState(undefined);

  useEffect(() => {
    socket.on('join room response', (res) => {
      console.log(res);
    });

    socket.on('signature', (res) => {
      console.log('Something happened');
      setSignatureValue(res);
    });

    socket.connect().emit(
      'join room',
      JSON.stringify({
        roomID: params.roomID,
      }),
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleOnSignature = (signature: string) => {
    socket.emit(
      'sign',
      JSON.stringify({
        signature: signature,
        roomID: params.roomID,
      }),
    );
  };

  return (
    <div>
      <h1>{params.roomID}</h1>
      <SignaturePad
        className="h-36 w-full"
        disabled={false}
        containerClassName="mt-2 rounded-lg border bg-background"
        onChange={(v) => {
          handleOnSignature(v);
        }}
        defaultValue={signatureValue}
      />
    </div>
  );
}
