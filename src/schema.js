import * as Yup from 'yup';

export default Yup.object().shape({
    cep: Yup.string().min(8, 'O CEP deve conter 8 caracteres.').required('O campo CEP é obrigatório.'),
});