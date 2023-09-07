import * as S from '../style';

import { Input } from '../../../components/Input';

import * as yup from 'yup';

import { useFormik } from 'formik';

import { toast } from 'react-toastify';

import Modal from '../../../components/Modal';

export default function ClientForm({ onSubmit, forEdit, visible, onCancelSubmit, title }){

    const registerClientSchema = yup.object().shape({
        whatsapp: yup.string().required('Informe o número do Whatsapp'),
        contactNumber: yup.string().required('Informe o número para contato'),
        fullName: yup.string().required('Informe o nome completo').max(150,'O nome deve possuir no máximo 150 caracteres'),
        adress: yup.string().notRequired().max(100,'O endereço deve possuir no máximo 150 caracteres'),
        neighborhood: yup.string().notRequired().max(65,'O bairro deve possuir no máximo 65 caracteres'),
        houseNumber: yup.string().notRequired().max(100000,'O Número da casa deve possuir no máximo 100000 caracteres'),
        complement: yup.string().notRequired().max(100,'O complemento deve possuir no máximo 100 caracteres')
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
        validateOnMount:true,
        validationSchema: registerClientSchema,
        onSubmit: async values => await onSubmit(values)
    });

    console.log(registerClientValidation.values.whatsapp.length);

    function handleRequest(event){

        event.preventDefault();

        if( !forEdit && !registerClientValidation.isValid ){

            for(const value in registerClientValidation.errors ){

                toast.error(registerClientValidation.errors[value]);

            }

            return

        }

        registerClientValidation.handleSubmit();

    }

    return(

        <Modal visible={visible} titleColor={'blue'} confirmTitle='Cadastrar' CancelTitle='Cancelar' title={title}>

            <S.NewRegisterContainer onSubmit={handleRequest}>

                <Input {...registerClientValidation.getFieldProps('whatsapp')} mask='(99) 99999-9999' placeholder='N° Whatsapp'></Input>

                <Input {...registerClientValidation.getFieldProps('contactNumber')} mask='(99) 99999-9999' placeholder='N° Telefone para Contato'></Input>

                <Input {...registerClientValidation.getFieldProps('fullName')} placeholder='Nome Completo'></Input>

                <Input {...registerClientValidation.getFieldProps('adress')} placeholder='Endereço'></Input>

                <Input {...registerClientValidation.getFieldProps('neighborhood')} placeholder='Bairro'></Input>

                <Input {...registerClientValidation.getFieldProps('houseNumber')} placeholder='N° Casa'></Input>

                <Input {...registerClientValidation.getFieldProps('complement')} placeholder='Complemento'></Input>

                <button type='submit'>Cadastrar</button>

                <button onClick={onCancelSubmit} type='button'>Cancelar</button>

            </S.NewRegisterContainer>

        </Modal>

    )

}