const mainMenu = $("#main-menu");
const mainContent = $("#main-content");
const mainContentTitle = $("#main-content-title");

const contentInicio = $("#content-inicio");
const contentMascotas = $("#content-mascotas");
const contentMascotasListado = $("#content-mascotas-listado");
const contentAgenda = $("#content-agenda");
const contentAgendaListado = $("#content-agenda-listado");
const contentContactos = $("#content-contactos");
const contentContactosListado = $("#content-contactos-listado");
const contentConfiguracion = $("#content-configuracion");

const menuInicioListado = $("#menu-inicio-listado");
const menuMascotaListado = $("#menu-mascota-listado");
const menuAgendaListado = $("#menu-agenda-listado");
const menuContactosListado = $("#menu-contactos-listado");
const menuConfiguracionListado = $("#menu-configuracion-listado");

menuInicioListado.click(function () {
    mainContentTitle.html(`<i class="fa-solid fa-house-chimney fa-sm"></i> Inicio`);
    contentInicio.css("display", "block");
    contentMascotas.css("display", "none");
    contentAgenda.css("display", "none");
    contentContactos.css("display", "none");
    contentConfiguracion.css("display", "none");
});
menuMascotaListado.click(function () {
    mainContentTitle.html(`<i class="fa-solid fa-paw fa-sm"></i> Listado de mascotas <span class="float-end"><button type="button" class="btn btn-sm btn-light" data-bs-toggle="modal" data-bs-target="#mdlRegistroMascota"><i class="fa-solid fa-add"></i></button></span>`);
    contentInicio.css("display", "none");
    contentMascotas.css("display", "block");
    contentAgenda.css("display", "none");
    contentContactos.css("display", "none");
    contentConfiguracion.css("display", "none");
    obtenerMascotas();
});
menuAgendaListado.click(function () {
    mainContentTitle.html(`<i class="fa-solid fa-calendar-day fa-sm"></i> Agenda`);
    contentInicio.css("display", "none");
    contentMascotas.css("display", "none");
    contentAgenda.css("display", "block");
    contentContactos.css("display", "none");
    contentConfiguracion.css("display", "none");
    renderCalendario();
});
menuContactosListado.click(function () {
    mainContentTitle.html(`<i class="fa-solid fa-user fa-sm"></i> Contactos <span class="float-end"><button type="button" class="btn btn-sm btn-light" data-bs-toggle="modal" data-bs-target="#mdlRegistroPropietario" onclick="auxVentanaPropietario = true;"><i class="fa-solid fa-add"></i></button></span>`);
    contentInicio.css("display", "none");
    contentMascotas.css("display", "none");
    contentAgenda.css("display", "none");
    contentContactos.css("display", "block");
    contentConfiguracion.css("display", "none");
    obtenerPropietarios();
});
menuConfiguracionListado.click(function () {
    mainContentTitle.html(`<i class="fa-solid fa-gears fa-sm"></i> Configuración`);
    contentInicio.css("display", "none");
    contentMascotas.css("display", "none");
    contentAgenda.css("display", "none");
    contentContactos.css("display", "none");
    contentConfiguracion.css("display", "block");
});

const list = document.querySelectorAll('.list');
function activeLink() {
    list.forEach((item) =>
        item.classList.remove('activo'));
    this.classList.add('activo');
}

list.forEach((item) => item.addEventListener('click', activeLink));