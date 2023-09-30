import { useEffect, useState } from 'react';
import * as S from './style';
import QRCode from "react-qr-code";
import { socket } from '../../services/socketIO';
import { useContext } from 'react';
import { BotStatusContext } from '../../contexts/BotStatusContext';

export default function Bot(){

    const [ qrCode, setQrCode ] = useState('');

    const { loadingBotStatus, botStatus } = useContext(BotStatusContext);

    useEffect( () => {

        socket.on('bot-qrcode', qr => setQrCode(qr) );

    },[]);

    return (
        <S.Container>

            { loadingBotStatus && (
                <h1>Carregando...</h1>
            )}

            { botStatus && <h1>Você já está conectado !</h1> }

            { qrCode && !botStatus && (
                <QRCode
                size={450}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={qrCode}
                viewBox={`0 0 256 256`}/>
            )}

        </S.Container>
    )

}