import { useState } from "react";


export default function usePaginationProps(){

    const [ search, setSearch ] = useState('');

    const [ page, setPage ] = useState(1);

    const [ quanty, setQuanty ] = useState(10);

    function handleSearch(event){
        setSearch(event.target.value);
    }

    function handlePage(event,page){

        setPage(page);

    }

    return {
        search:{
            getter: search,
            setter: setSearch,
            handler: handleSearch
        },
        page:{
            getter: page,
            setter: setPage,
            handler: handlePage
        },
        quanty:{
            getter: quanty,
            setter: setQuanty
        }
    }

}