class Mascota {
    mascotaList = [];
    constructor() {
        console.log('Mascota init.');
    }

    registrarMascota(mascota) {
        this._id = mascota._id;
        this.owner = mascota.owner;
        this.name = mascota.name;
        this.breed = mascota.breed;
        this.gender = mascota.gender;
        this.color = mascota.color;
        this.sterilized = mascota.sterilized;
        this.birthType = mascota.birthType;
        this.birthYear = mascota.birthYear;
        this.birthMonth = mascota.birthMonth;
        this.birthDays = mascota.birthDays;
        this.photo = 'https://picsum.photos/200';
        this.notes = mascota.notes;

        this.mascotaList.push({
            _id: this._id,
            owner: this.owner,
            name: this.name,
            breed: this.breed,
            gender: this.gender,
            color: this.color,
            sterilized: this.sterilized,
            birthType: this.birthType,
            birthYear: this.birthYear,
            birthMonth: this.birthMonth,
            birthDays: this.birthDays,
            photo: this.photo,
            notes: this.notes
        });
        return true;
    }

    listarMascotas() {
        return this.mascotaList;
    }
}