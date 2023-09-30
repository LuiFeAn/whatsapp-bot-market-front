import { useEffect, useState } from 'react';
import * as S from './style';
import QRCode from "react-qr-code";
import { socket } from '../../services/socketIO';

export default function Bot(){

    const [ qrCode, setQrCode ] = useState('');

    useEffect( () => {

        socket.on('bot-qrcode', qr => setQrCode(qr) );

    },[]);

    return (
        <S.Container>

            { qrCode && (
                <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={qrCode}
                viewBox={`0 0 256 256`}/>
            )}

        </S.Container>
    )

}