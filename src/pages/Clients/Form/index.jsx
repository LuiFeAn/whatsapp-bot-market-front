import * as S from '../style';

import { Input } from '../../../components/Input';

import * as yup from 'yup';

import { useFormik } from 'formik';

import { toast } from 'react-toastify';

import Button from '../../../components/Button';

export default function ClientForm({ onSubmit, forEdit }){

    const registerClientSchema = yup.object().shape({
        whatsapp: yup.string().required('Informe o número do Whatsapp'),
        contactNumber: yup.string().required('Informe o número para contato'),
        fullName: yup.string().required('Informe o nome completo').max(150),
        adress: yup.string().notRequired().max(150),
        neighborhood: yup.string().notRequired(),
        houseNumber: yup.string().notRequired(),
        complement: yup.string().notRequired()
    });

    const registerClientValidation = useFormik({
        initialValues:{
            whatsapp:'',
            contactNumber:'',
            fullName:'',
            adress:'',
            neighborhood:'',
            houseNumber:'',
            complement:'',
        },
        validationSchema: registerClientSchema,
        onSubmit: submit
    });

    async function submit(event){

        console.log(event);

        if( !forEdit ){

            console.log(registerClientValidation.isValid)

        }

        await onSubmit({
            whatsapp: registerClientValidation.values.whatsapp,
            fullName: registerClientValidation.values.fullName,
            contactNumber: registerClientValidation.values.contactNumber,
            adress: registerClientValidation.values.neighborhood,
            houseNumber: registerClientValidation.values.houseNumber,
            complement: registerClientValidation.values.complement
        });

    }

    return(
        <S.NewRegisterContainer>

            <Input {...registerClientValidation.getFieldProps('whatsapp')} mask='(99) 99999-9999' placeholder='N° Whatsapp'></Input>

            <Input {...registerClientValidation.getFieldProps('contactNumber')} mask='(99) 99999-9999' placeholder='N° Telefone para Contato'></Input>

            <Input {...registerClientValidation.getFieldProps('fullName')} placeholder='Nome Completo'></Input>

            <Input {...registerClientValidation.getFieldProps('adress')} placeholder='Endereço'></Input>

            <Input {...registerClientValidation.getFieldProps('neighborhood')} placeholder='Bairro'></Input>

            <Input {...registerClientValidation.getFieldProps('houseNumber')} placeholder='N° Casa'></Input>

            <Input {...registerClientValidation.getFieldProps('complement')} placeholder='Complemento'></Input>

            <Button>Test</Button>
            

    </S.NewRegisterContainer>
    )

}