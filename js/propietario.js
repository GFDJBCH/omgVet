class Propietario {
    propietarioList = [];
    mascotaList = [];
    constructor() {
        console.log('Propietario init.');
        this.propietarioList = [];
        this.mascotaList = [];
    }

    registrarPropietario(propietario) {
        this.propietarioList.push({
            _id: new Date().toISOString(),
            name: propietario.name.trim(),
            gender: propietario.gender.trim(),
            phone: propietario.phone.trim(),
            email: propietario.email.trim(),
            user: propietario.user.trim(),
            pets: propietario.pets,
        });
        this.listarMascotasPropietario();
        return true;
    }
    actualizarPropietario(propietario) {
        this.propietarioList.forEach((element, index) => {
            if(element._id === propietario._id) {
                this.propietarioList[index] = propietario;
            }
        });
        this.listarMascotasPropietario();
        return true;
    }

    listarPropietarios() {
        return this.propietarioList;
    }

    obtenerPropietario(propietarioId) {
        return this.propietarioList.find(item => item._id === propietarioId);
    }

    registrarMascotaPropietario(propietario, mascota) {
        const result = this.propietarioList.find(item => item._id === propietario._id);
        let newMascota = {
            _id: mascota._id,
            owner: propietario._id,
            name: mascota.name,
            breed: mascota.breed,
            gender: mascota.gender,
            color: mascota.color,
            sterilized: mascota.sterilized,
            birthType: mascota.birthType,
            birthYear: mascota.birthYear,
            birthMonth: mascota.birthMonth,
            birthDays: mascota.birthDays,
            photo: 'https://picsum.photos/200',
            notes: mascota.notes,
        }
        result.pets.push(newMascota);
        return true;
    }

    listarMascotasPropietario() {
        this.mascotaList = [];
        this.propietarioList.forEach((propietario) => {
            propietario.pets.forEach((mascota) => {
             mascota.owner = propietario._id;
             mascota.ownerName = propietario.name;
                this.mascotaList.push({
                    _id: mascota._id,
                    owner: mascota.owner,
                    ownerName: propietario.name,
                    name: mascota.name,
                    breed: mascota.breed,
                    gender: mascota.gender,
                    color: mascota.color,
                    sterilized: mascota.sterilized,
                    birthType: mascota.birthType,
                    birthYear: mascota.birthYear,
                    birthMonth: mascota.birthMonth,
                    birthDays: mascota.birthDays,
                    photo: mascota.photo,
                    notes: mascota.notes
                });
            });
        });
        return this.mascotaList;
    }
}