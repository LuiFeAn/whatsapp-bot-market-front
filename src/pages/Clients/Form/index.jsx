import * as S from '../style';

import { Input } from '../../../components/Input';

import * as yup from 'yup';

import { useFormik } from 'formik';

import { toast } from 'react-toastify';

import Modal from '../../../components/Modal';

import phoneNumberMask from '../../../utils/phoneNumberMask';

import convertToPhoneId from '../../../utils/convertToPhoneId';
import { useEffect } from 'react';

export default function ClientForm({ onSubmit, forEdit, visible, onCancelSubmit, title, clearFields }){

    const registerClientSchema = yup.object().shape({
        whatsapp: yup.string()[ !forEdit ? 'required' : 'notRequired']('Informe o número do Whatsapp').min(11,'Número de Whatsapp inválido'),
        contactNumber: yup.string().notRequired('Informe o número para contato').min(11,'Número para contato inválido'),
        fullName: yup.string()[ !forEdit ? 'required' : 'notRequired']('Informe o nome completo').max(150,'O nome deve possuir no máximo 150 caracteres'),
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
        onSubmit: async values => await onSubmit({
            ...values,
            forEdit,
            whatsapp: values.whatsapp.length > 0 ? convertToPhoneId(values.whatsapp) : ''
        })
    });

    function handlePhoneField(field,event){
        registerClientValidation.setFieldValue(field,phoneNumberMask(event.target.value));
    }

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

    useEffect( () => {

        if(clearFields){

            registerClientValidation.setFieldValue('whatsapp','');

            registerClientValidation.setFieldValue('contactNumber','');

            registerClientValidation.setFieldValue('fullName','');

            registerClientValidation.setFieldValue('adress','');

            registerClientValidation.setFieldValue('neighborhood','');

            registerClientValidation.setFieldValue('houseNumber','');

            registerClientValidation.setFieldValue('complement','');


        }

    },[clearFields]);

    return(

        <Modal visible={visible} titleColor={'blue'} confirmTitle='Cadastrar' CancelTitle='Cancelar' title={title}>

            <S.NewRegisterContainer onSubmit={handleRequest}>

                <Input {...registerClientValidation.getFieldProps('whatsapp')} onChange={ (event) => handlePhoneField('whatsapp',event)} placeholder='N° Whatsapp'></Input>

                <Input {...registerClientValidation.getFieldProps('contactNumber')} onChange={ (event) => handlePhoneField('contactNumber',event)} placeholder='N° Telefone para Contato'></Input>

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