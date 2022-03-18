import React from 'react'
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import schema from "../schema";

function onBlurCep(ev, setFieldValue) {
    const { value } = ev.target;
    const cep = value?.replace(/[^0-9]/g, '');

    if (cep?.length !== 8) {
        setFieldValue('logradouro', '');
        setFieldValue('complemento', '')
        setFieldValue('bairro', '');
        setFieldValue('cidade', '');
        setFieldValue('uf', '');
        return;
    }

    fetch(`https://localhost:44336/api/enderecos/ObterEndereco/${cep}`)
        .then((res) => res.json())
        .then((data) => {
            setFieldValue('logradouro', data.logradouro);
            setFieldValue('complemento', data.complemento)
            setFieldValue('bairro', data.bairro);
            setFieldValue('cidade', data.localidade);
            setFieldValue('uf', data.uf);
        })
}

export const ConsultaCep = () => {
    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                cep: '',
                logradouro: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                uf: '',
            }}
            render={({ setFieldValue }) => (
                <div>
                    <h1 className="my-4 font-weight-bold-display-4">Consulta Cep</h1>
                    <Form>
                        <TextField id="cep" label="Cep" name="cep" type="text" maxLength="9" onBlur={(ev) => onBlurCep(ev, setFieldValue)} />
                        <TextField id="logradouro" label="Logradouro" name="logradouro" type="text" />
                        <TextField id="complemento" label="Complemento" name="complemento" type="text" />
                        <TextField id="bairro" label="Bairro" name="bairro" type="text" />
                        <TextField id="cidade" label="Cidade" name="cidade" type="text" />
                        <TextField id="uf" label="Estado" name="uf" type="text" />
                    </Form>
                </div>
            )}
        />
    )
}