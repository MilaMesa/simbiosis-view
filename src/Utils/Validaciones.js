
export function validarTexto(value) {
    const textoRegex = RegExp(/^[A-Z Ñ]+$/i);
    return textoRegex.test(value) ? '' : 'El campo debe contener solo letras.\n';
};

export function validarNumerico(value) {
    const textoRegex = RegExp(/^\d+$/i);
    if (value.length > 0) {
        return textoRegex.test(value) ? '' : 'El campo debe contener solo numeros.\n';
    }
    else {
        return '';
    }
};

export function validarValorMaximo(value, maximo) {
    return value.length <= maximo ? '' : 'El campo no debe superar los ' + maximo + ' caracteres.\n';
};

export function validarValorMinimo(value, minimo) {
    return value.length > minimo ? '' : 'El campo debe superar los ' + minimo + ' caracteres.\n';
};

export function validarVacio(value) {
    return value.length > 0 ? '' : 'El campo no debe estar vacio.\n';
};

export function validarCorreo(value) {
    const validEmailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    return validEmailRegex.test(value)
        ? ''
        : 'El campo no es valido';
};

export function validarDireccion(value) {
    const validDirRegex = RegExp('^(cll|crr|calle|carrera|carretera|circular|circunvalar|avenida|transversal)\\ \\d{1,3}\\ ?(\\w|\\W){1,3}?\\ ?(norte|sur|este|oeste|oriente|occidente)?\\ ?(#\\ ?\\d{1,3})\\ ?(\\w|\\W){1,3}?\\ ?(norte|sur|este|oeste|oriente|occidente)?\\ ?(-\\ ?\\d{1,3})$');
    return validDirRegex.test(value) ? '' : 'El campo no es una direccion valida.'
};

export default validarTexto;