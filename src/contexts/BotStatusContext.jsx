
import { createContext, useState, useEffect } from "react";

export const BotStatusContext = createContext(null);

import econoAPI from "../services/econobotAPI";

export default function BotStatusProvider({children}){

    const [ loadingBotStatus, setLoadingBotStatus ] = useState(true);

    const [ botStatus, setBotStatus ] = useState(false);

    useEffect( () => {

        ( async () => {

            try{

                const response = await econoAPI.get('/bot');

                const { data: { isOnline } } = response;
                
                setBotStatus(isOnline);

            }catch(err){

                setBotStatus(false);

            }finally{

                setLoadingBotStatus(false);

            }

        })();

    },[]);

    return (
        <BotStatusContext.Provider value={{ loadingBotStatus, botStatus, setBotStatus, setLoadingBotStatus }}>
            {children}
        </BotStatusContext.Provider>
    )

}