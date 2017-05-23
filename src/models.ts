//Место куда клеить
interface Place {
    id: string,
    caption: string,
    serviceIDs: string[]
    area: number
}

//Виды тонировки
interface Service {
    id: string,
    caption: string
}


//Сама пленка
interface Material {
    id: string,
    property: {
        color: Color, // Цвет пленки
        opacity: Opacity, // Светопропускаемость
        producer: Producer, // Происводитель
        thickness: Thickness // Толщина
    },
    price: number,
    serviceIds: string[]
}

interface Color {
    id: string,
    caption: string,
    rgb: string;
}

interface Producer {
    id: string;
    caption: string
}

interface Thickness {
    id: string,
    caption: string,
    value: number;
}

interface Opacity {
    id: string,
    caption: string,
    value: number
}
