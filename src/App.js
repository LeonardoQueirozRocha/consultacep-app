import React from "react";
import { Formik, Field, Form } from "formik";
import schema from "./schema";
import './App.css';

function App() {
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
      });
  }

  return (
    <div className="App">
      <Formik
        validationSchema={schema}
        validateOnMount
        initialValues={{
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          uf: '',
        }}
        render={({ setFieldValue, errors }) => (
          <Form>
            <div className="form-control-group">
              <label htmlFor="cep">Cep</label>
              <Field id="cep" class="form-control" name="cep" type="text" onBlur={(ev) => onBlurCep(ev, setFieldValue)} />
              {errors.cep && (
                <div class="text-danger">{errors.cep}</div>
              )}
            </div>
            <div className="form-control-group ">
              <label>Logradouro</label>
              <Field class="form-control" name="logradouro" type="text" />
            </div>
            <div className="form-control-group">
              <label>Número</label>
              <Field class="form-control" name="numero" type="text" />
            </div>
            <div className="form-control-group">
              <label>Complemento</label>
              <Field class="form-control" name="complemento" type="text" />
            </div>
            <div className="form-control-group">
              <label>Bairro</label>
              <Field class="form-control" name="bairro" type="text" />
            </div>
            <div className="form-control-group">
              <label>Cidade</label>
              <Field class="form-control" name="cidade" type="text" />
            </div>
            <div className="form-control-group">
              <label>Estado</label>
              <Field class="form-control" name="uf" type="text" />
            </div>
          </Form>
        )}
      />
    </div>
  );
}

export default App;
