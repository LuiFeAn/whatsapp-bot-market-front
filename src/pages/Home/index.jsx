import * as React from 'react';
import * as S from './style';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import delivery from '../../assets/images/delivery.jpg';
import clients from '../../assets/images/clients.jpg';
import booklet from '../../assets/images/encarte.png';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home({headerTitle}) {


  const Nav = useNavigate();

  useEffect( () => {

    headerTitle.setter('Página Inicial')

  },[]);

  return (

    <S.Container>

        <Card sx={{ maxWidth: 1500, maxHeight:1500 }}>

            <CardMedia sx={{ height: 150, width:450 }} image={delivery}/>

            <CardContent>

                <Typography gutterBottom variant="h5" component="div">

                PEDIDOS

                </Typography>

                <Typography variant="body2" color="text.secondary">

                    <strong>Visualize e gerencie os pedidos</strong>
                
                </Typography>

            </CardContent>

            <CardActions>

                <Button onClick={ () => Nav('pedidos') } size="small">VISUALIZAR</Button>

            </CardActions>

        </Card>

        <Card sx={{ maxWidth: 1500, maxHeight:1500 }}>

            <CardMedia sx={{ height: 150, width:450 }} image={clients}/>

            <CardContent>

                <Typography gutterBottom variant="h5" component="div">

                  CLIENTES

                </Typography>

                <Typography variant="body2" color="text.secondary">

                    <strong>Visualize e gerencie seus clientes</strong>
                
                </Typography>

            </CardContent>

            <CardActions>

                <Button onClick={ () => Nav('clientes') } size="small">VISUALIZAR</Button>

            </CardActions>

        </Card>

        <Card sx={{ maxWidth: 1500, maxHeight:1500 }}>

            <CardMedia sx={{ height: 150, width:450 }} image={booklet}/>

            <CardContent>

                <Typography gutterBottom variant="h5" component="div">

                  Encartes

                </Typography>

                <Typography variant="body2" color="text.secondary">

                   <strong>Gerencie aqui seus encartes</strong>
                
                </Typography>

            </CardContent>

            <CardActions>

                <Button onClick={ () => Nav('encartes') } size="small">VISUALIZAR</Button>

            </CardActions>

        </Card>

    </S.Container>

    
  );
}
