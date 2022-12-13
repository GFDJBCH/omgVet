
//comentario: Configuración parsley js

window.ParsleyConfig = $.extend( window.ParsleyConfig || {}, {
    successClass: 'is-valid',
    errorClass: 'is-invalid',
    errorsWrapper: '<ul class="jv-form-error-msg text-danger p-0"></ul>',
    errorTemplate: '<li style="list-style-type: none;"></li>'
});