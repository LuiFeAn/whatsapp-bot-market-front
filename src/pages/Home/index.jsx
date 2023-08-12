import * as React from 'react';
import * as S from './style';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import delivery from '../../assets/images/delivery.jpg';

import { useNavigate } from 'react-router-dom';

export default function Home() {


  const Nav = useNavigate();

  return (

    <S.Container>

        <Card sx={{ maxWidth: 1500, maxHeight:1500 }}>

            <CardMedia sx={{ height: 150, width:450 }} image={delivery}/>

            <CardContent>

                <Typography gutterBottom variant="h5" component="div">

                PEDIDOS

                </Typography>

                <Typography variant="body2" color="text.secondary">

                    Visualize aqui todos os pedidos feitos
                
                </Typography>

            </CardContent>

            <CardActions>

                <Button onClick={ () => Nav('pedidos') } size="small">VISUALIZAR</Button>

            </CardActions>

        </Card>

    </S.Container>

    
  );
}
