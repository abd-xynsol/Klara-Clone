import React from 'react'
import QRCode from 'react-qr-code'


export default function MFASetup({ secret = 'otpauth://totp/Klara:user@example.com?secret=JBSWY3DPEHPK3PXP&period=30' }: { secret?: string }) {
return (
<div className="p-4 bg-white rounded shadow">
<h3 className="font-semibold mb-2">Set up TOTP</h3>
<div className="flex gap-4 items-center">
<div>
<QRCode value={secret} />
</div>
<div>
<p>Open Google Authenticator and scan the QR code. Then enter the 6-digit code to verify.</p>
</div>
</div>
</div>
)
}