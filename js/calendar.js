console.log("calendario");
const calendarEl = document.getElementById('calendar');
const calendarEl2 = document.getElementById('calendar2');
const calendar = new FullCalendar.Calendar(calendarEl, {
    aspectRatio: 1,
    initialView: 'timeGridDay',
    locale: 'es-MX',
    eventBackgroundColor: 'blue',
    themeSystem: 'bootstrap5',
    headerToolbar: false,
    allDaySlot: false,
    weekNumbers: true,
    nowIndicator: true,
    views: {
        resourceTimeGridTwoDay: {
            type: 'resourceTimeGrid',
            duration: {days: 2},
            buttonText: '2 Dias',
        }
    },
    events: [
        {
            id: 'a',
            title: "Adabella Gaitán Quintero",
            start: moment().format('YYYY-MM-DD HH:mm'),
            end: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm'),
            description: "Prueba de cita #1",
            color: "#CD2626",
        },
        {
            id: 'a',
            title: "Grizelda Escalante Perales",
            start: moment().format('YYYY-MM-DD HH:mm'),
            end: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm'),
            description: "Prueba de cita #1",
            color: "#CD2626",
        },
    ]
});

const calendar2 = new FullCalendar.Calendar(calendarEl2, {
    aspectRatio: 0.6,
    initialView: 'listWeek',
    locale: 'es-MX',
    themeSystem: 'bootstrap5',
    headerToolbar: false,
    allDaySlot: false,
    weekNumbers: true,
    nowIndicator: true,
    events: [
        {
            id: 'a',
            title: "Adabella Gaitán Quintero",
            start: moment().format('YYYY-MM-DD HH:mm'),
            end: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm'),
            description: "Prueba de cita #1",
            color: "#CD2626",
        },
        {
            id: 'a',
            title: "Grizelda Escalante Perales",
            start: moment().format('YYYY-MM-DD HH:mm'),
            end: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm'),
            description: "Prueba de cita #1",
            color: "#CD2626",
        },
    ]
});
calendar2.render();
const calendarView = $("#calendarView");
calendarView.change(function () {
    // cal.setOptions({month: {visibleWeeksCount: 2}}, true);
    calendar.changeView($(this).val(), true);

    if (screen.width < 500) {
        calendar.setOption('aspectRatio', 0.8);
    } else {
        calendar.setOption('aspectRatio', 2.3);
    }
});

const lblFechaCalendario = $("#lblFechaCalendario");
const btnCalendarPrev = $("#btnCalendarPrev");
const btnCalendarToDay = $("#btnCalendarToDay");
const btnCalendarNext = $("#btnCalendarNext");
btnCalendarPrev.click(function () {
    calendar.prev();
    lblFechaCalendario.html(moment(calendar.getDate()).format('MMMM YYYY, DD'));
});
btnCalendarToDay.click(function () {
    calendar.today();
    lblFechaCalendario.html(moment(calendar.getDate()).format('MMMM YYYY, DD'));
});
btnCalendarNext.click(function () {
    calendar.next();
    lblFechaCalendario.html(moment(calendar.getDate()).format('MMMM YYYY, DD'));
});

function renderCalendario() {
    calendar.render();
    lblFechaCalendario.html(moment(calendar.getDate()).format('MMMM YYYY, DD'));
}