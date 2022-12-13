// comentario: Listado de mascotas.

let auxVentanaPropietario = false;
let auxVentanaMascota = false;
let auxMascotasPreRegistro = [];
let auxFotografia = null;

const mdlRegistroMascota = new bootstrap.Modal('#mdlRegistroMascota', {
    keyboard: false
});
const mdlRegistroMascotaLabel = $("#mdlRegistroMascotaLabel");
const frmMascota = $("#frmMascota");

const mascotaOwnerId = $("#mascotaOwnerId");
const mascotaOwner = $("#mascotaOwner");
const mascotaName = $("#mascotaName");
const mascotaBreed = $("#mascotaBreed");
const mascotaGender = $("#mascotaGender");
const mascotaColor = $("#mascotaColor");
const mascotaSterilized = $("#mascotaSterilized");
const mascotaBirthType = $("#mascotaBirthType");
const mascotaBirthYear = $("#mascotaBirthYear");
const mascotaBirthMonth = $("#mascotaBirthMonth");
const mascotaBirthDays = $("#mascotaBirthDays");
const mascotaNote = $("#mascotaNote");

mascotaBreed.select2({
    placeholder: 'Seleccionar raza',
    dropdownParent: $('#mdlRegistroMascota'),
    theme: 'bootstrap-5'
});
mascotaGender.select2({
    placeholder: 'Seleccionar genero',
    allowClear: true,
    dropdownParent: $('#mdlRegistroMascota'),
    minimumResultsForSearch: -1,
    theme: 'bootstrap-5'
});
mascotaSterilized.select2({
    placeholder: 'Esterilizado',
    allowClear: true,
    dropdownParent: $('#mdlRegistroMascota'),
    minimumResultsForSearch: -1,
    theme: 'bootstrap-5'
});
mascotaBirthType.select2({
    placeholder: 'Seleccionar nacimiento',
    allowClear: true,
    dropdownParent: $('#mdlRegistroMascota'),
    minimumResultsForSearch: -1,
    theme: 'bootstrap-5'
});
mascotaBirthYear.select2({
    placeholder: 'Seleccionar año',
    allowClear: true,
    dropdownParent: $('#mdlRegistroMascota'),
    minimumResultsForSearch: -1,
    theme: 'bootstrap-5'
});
mascotaBirthMonth.select2({
    placeholder: 'Seleccionar meses',
    allowClear: true,
    dropdownParent: $('#mdlRegistroMascota'),
    minimumResultsForSearch: -1,
    theme: 'bootstrap-5'
});
mascotaBirthDays.select2({
    placeholder: 'Seleccionar días',
    allowClear: true,
    dropdownParent: $('#mdlRegistroMascota'),
    minimumResultsForSearch: -1,
    theme: 'bootstrap-5'
});

frmMascota.on('submit', function (e) {
    e.preventDefault();
    let form = $(this);
    form.parsley().validate();
    if (form.parsley().isValid()) {
        // comentario: Si son true agregar a pre-registro.
        if (auxVentanaPropietario && auxVentanaMascota) {
            let preMascota = {
                _id: new Date().toISOString(),
                owner: mascotaOwnerId.val(),
                ownerName: propietarioName.val(),
                name: mascotaName.val(),
                breed: mascotaBreed.val(),
                gender: mascotaGender.val(),
                color: mascotaColor.val(),
                sterilized: mascotaSterilized.val(),
                birthType: mascotaBirthType.val(),
                birthYear: mascotaBirthYear.val(),
                birthMonth: mascotaBirthMonth.val(),
                birthDays: mascotaBirthDays.val(),
                photo: auxFotografia === null ? 'https://picsum.photos/200' : null,
                notes: mascotaNote.val(),
            };
           if (propietarioId.val() !== '') {
               propietarioClass.registrarMascotaPropietario(currentPropietario, preMascota);
           }
            auxMascotasPreRegistro.push(preMascota);
            renderMascota(preMascota, true);
            auxVentanaMascota = false;
            resetFormularioMascota();
            mdlRegistroMascota.hide();
            mdlRegistroPropietario.show();
        }
    }
});

const mdlRegistroPropietario = new bootstrap.Modal('#mdlRegistroPropietario', {
    keyboard: false
});
const mdlRegistroPropietarioLabel = $("#mdlRegistroPropietarioLabel");
const frmPropietario = $("#frmPropietario");
const propietarioId = $("#propietarioId");
const propietarioName = $("#propietarioName");
const propietarioGender = $("#propietarioGender");
const propietarioPhone = $("#propietarioPhone");
const propietarioEmail = $("#propietarioEmail");
const propietarioUser = $("#propietarioUser");
const contentPreRegistroMascota = $("#content-pre-registro-mascota");

propietarioGender.select2({
    placeholder: 'Seleccionar genero',
    allowClear: true,
    dropdownParent: $('#mdlRegistroPropietario'),
    minimumResultsForSearch: -1,
    theme: 'bootstrap-5'
});
propietarioPhone.inputmask({"mask": "(999) 999-9999"});

const propietarioClass = new Propietario();
let currentPropietario = {
    name: null,
    gender: null,
    phone: null,
    email: null,
    user: null,
};

frmPropietario.on('submit', function (e) {
    e.preventDefault();
    let form = $(this);
    form.parsley().validate();
    if (form.parsley().isValid()) {
        let validar = false;
        if (propietarioId.val() !== '') {
            currentPropietario._id = propietarioId.val();
            currentPropietario.name = propietarioName.val().trim();
            currentPropietario.gender = propietarioGender.val().trim();
            currentPropietario.phone = propietarioPhone.val().trim();
            currentPropietario.email = propietarioEmail.val().trim();
            currentPropietario.user = propietarioUser.val().trim();
            validar = propietarioClass.actualizarPropietario(currentPropietario);
        } else {
            currentPropietario = {
                name: propietarioName.val().trim(),
                gender: propietarioGender.val().trim(),
                phone: propietarioPhone.val().trim(),
                email: propietarioEmail.val().trim(),
                user: propietarioUser.val().trim(),
                pets: auxMascotasPreRegistro
            };
            validar = propietarioClass.registrarPropietario(currentPropietario);
        }
        if (validar) {
            obtenerPropietarios();
            resetFormularioPropietario();
        }
    }
});

function obtenerPropietarios() {
    const propietarios = propietarioClass.listarPropietarios();
    contentContactosListado.html(null);
    if (propietarios.length > 0) {
        propietarios.forEach(item => renderPropietario(item));
    } else {
        renderPropietario();
    }
}

function renderPropietario(propietario = null) {
    let propietarioHtml = '';
    if (propietario) {
        const auxGender = propietario.gender === 'male' ? '#0d6efd' : '#d63384';
        const auxEmail = propietario.email === '' || propietario.email === null ? `<span class="fst-italic small">Sin correo registrado</span>` : propietario.email;
        const auxPets = propietario.pets.length === 0 ? `<span class="small m-0 text-muted text-center fst-italic">Sin mascotas</span>` : `<span class="display-6 m-0 fw-bold">` + propietario.pets.length + `</span>`;
        propietarioHtml = `
                        <div class="card shadow-sm my-2 card-propietario" style="border: solid ` + auxGender + ` 1px;" onclick="obtenerInformacionPropietario('` + propietario._id + `')">
                            <div class="card-body py-1">
                                <div class="row">
                                    <div class="col-8">
                                        <h5 class="card-title text-truncate" style="color: ` + auxGender + `;"><span title="` + propietario.name + `">` + propietario.name + `</span></h5>
                                        <h6 class="card-subtitle small mb-2 text-muted"><i class="fa-solid fa-mobile"></i> ` + propietario.phone + `</h6>
                                        <h6 class="card-subtitle small mb-2 text-muted text-truncate" title="` + propietario.email + `"><i class="fa-solid fa-envelope"></i> ` + auxEmail + `</h6>
                                    </div>
                                    <div class="col-4 d-flex justify-content-center align-items-center flex-column" style="color: ` + auxGender + `;">
                                        <i class="fa-solid fa-paw fa-2x"></i>` + auxPets + `
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
    } else {
        propietarioHtml = `
    <div class="py-4 text-center">
            <span class="display-6 m-0 text-muted">No hay contactos registrados.</span>
        </div>
    `;
    }
    contentContactosListado.prepend(propietarioHtml);
}

function obtenerMascotas() {
    const mascotas = propietarioClass.listarMascotasPropietario();
    contentMascotasListado.html(null);
    if (mascotas.length > 0) {
        mascotas.forEach(item => renderMascota(item));
    } else {
        renderMascota();
    }
}

function renderMascota(mascota = null, preRegistro = null) {
    let mascotaHtml = '';
    if (mascota) {
        const auxGender = mascota.gender === 'male' ? '<i class="fa-solid fa-mars fa-2x" style="color: #0d6efd;"></i>' : '<i class="fa-solid fa-venus fa-2x" style="color: #d63384;"></i>';
        const auxBirthYear = mascota.birthYear === '' ? '' : mascota.birthYear + " años, ";
        const auxBirthMonth = mascota.birthMonth === '' ? '' : mascota.birthMonth + " meses, ";
        const auxBirthDays = mascota.birthDays === '' ? '' : mascota.birthDays + " días";
        let auxBirth = auxBirthYear + auxBirthMonth + auxBirthDays;
        auxBirth = auxBirth === '' ? 'Sin fecha' : auxBirth;

        mascotaHtml = `
    <div class="card shadow-sm my-2 card-mascota">
        <div class="card-body py-1">
            <div class="row">
                <div class="col-3 d-flex justify-content-center align-items-center">
                    <img src="` + mascota.photo + `" alt="Perfil" class="img-fluid rounded-circle img-thumbnail" width="70">
                </div>
                <div class="col-7">
                    <h5 class="card-title"><span>` + mascota.name + `</span> <small class="text-muted small-xs">(` + auxBirth + `)</small></h5>
                    <h6 class="card-subtitle small mb-2 text-muted">` + mascota.ownerName + `</h6>
                    <h6 class="card-subtitle small mb-2 text-muted text-truncate" title="` + mascota.breed + `"><i class="fa-solid fa-paw"></i> ` + mascota.breed + `</h6>
                </div>
                <div class="col-2 d-flex justify-content-center align-items-center">` + auxGender + `</div>
            </div>
        </div>
    </div>
    `;
    } else {
        mascotaHtml = `
    <div class="py-4 text-center">
            <span class="display-6 m-0 text-muted">No hay mascotas registrdas.</span>
        </div>
    `;
    }
    if (preRegistro) {
        contentPreRegistroMascota.append(mascotaHtml);
    } else {
        contentMascotasListado.prepend(mascotaHtml);
    }
}

function filtrarMascota() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("content-mascotas-listado");
    li = ul.querySelectorAll(".card-mascota");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("span")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function cerrarVentana() {

    if (auxVentanaPropietario && auxVentanaMascota) {
        mdlRegistroMascota.hide();
        mdlRegistroPropietario.show();
    } else if (!auxVentanaPropietario && !auxVentanaMascota) {
        mdlRegistroMascota.hide();
        mdlRegistroPropietario.hide();
    }
}

const mdlRegistroPropietarioEl = document.getElementById('mdlRegistroPropietario');
mdlRegistroPropietarioEl.addEventListener('hidden.bs.modal', event => {
    if (!auxVentanaPropietario && !auxVentanaMascota) {
        resetFormularioPropietario();
    }
});

const mdlRegistroMascotaEl = document.getElementById('mdlRegistroMascota');
mdlRegistroMascotaEl.addEventListener('hidden.bs.modal', event => {
    if (auxVentanaPropietario && auxVentanaMascota) {
        auxVentanaMascota = false;
    }
    resetFormularioMascota();
});


function resetFormularioMascota() {
    frmMascota[0].reset();
    mascotaBreed.trigger("change");
    mascotaGender.trigger("change");
    mascotaSterilized.trigger("change");
    mascotaBirthType.trigger("change");
    mascotaBirthYear.trigger("change");
    mascotaBirthMonth.trigger("change");
    mascotaBirthDays.trigger("change");
    frmMascota.parsley().reset();
}

function resetFormularioPropietario() {
    frmPropietario[0].reset();
    propietarioGender.trigger("change");
    frmPropietario.parsley().reset();
    auxVentanaPropietario = false;
    auxVentanaMascota = false;
    auxMascotasPreRegistro = [];
    contentPreRegistroMascota.html(null);
    currentPropietario = {
        name: null,
        gender: null,
        phone: null,
        email: null,
        user: null,
    };
    mdlRegistroPropietarioLabel.html("Registrar contacto");
    mdlRegistroPropietario.hide();
}

function obtenerInformacionPropietario(propietario) {
    const prop = propietarioClass.obtenerPropietario(propietario);
    auxVentanaPropietario = true;
    auxVentanaMascota = false;
    mdlRegistroPropietarioLabel.html(`<i class="fa-solid fa-pen-to-square"></i> ` + prop.name);
    propietarioId.val(prop._id);
    propietarioName.val(prop.name);
    propietarioGender.val(prop.gender).trigger("change");
    propietarioPhone.val(prop.phone);
    propietarioEmail.val(prop.email);
    propietarioUser.val(prop.user);

    currentPropietario = {
        _id: prop._id,
        name: prop.name,
        gender: prop.gender,
        phone: prop.phone,
        email: prop.email,
        user: prop.user,
        pets: prop.pets
    };

    if (prop.pets.length > 0) {
        prop.pets.forEach((item) => {
            renderMascota(item, true);
        });
    }
    frmPropietario.parsley().reset();
    mdlRegistroPropietario.show();
}