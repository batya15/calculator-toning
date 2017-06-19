import {Request} from './request';

export default {
	places: new Request<Api.IPlace>('places'),
	services: new Request<Api.IService>('services'),
	materials: new Request<Api.IMaterial>('materials'),
	producers: new Request<Api.IProducer>('producers'),
	colors: new Request<Api.IColor>('colors'),
	thickness: new Request<Api.IThickness>('thickness'),
	opacity: new Request<Api.IOpacity>('opacity'),
}

export namespace Api {
	//Место куда клеить
	export interface IPlace {
		id: string,
		caption: string,
		serviceIDs: string[]
		area: number
	}

//Виды тонировки
	export interface IService {
		id: string,
		caption: string
	}


//Сама пленка
	export interface IMaterial {
		id: string,
		property: {
			producerId?: string, // Происводитель
			colorId?: string, // Цвет пленки
			opacityId?: string, // Светопропускаемость
			thicknessId?: string // Толщина
		},
		price: number,
		serviceIds: string[]
	}

	export interface IColor {
		id: string,
		caption: string,
		rgb: string;
	}

	export interface IProducer {
		id: string;
		caption: string
	}

	export interface IThickness {
		id: string,
		caption: string,
		value: number;
	}

	export interface IOpacity {
		id: string,
		caption: string,
		value: number
	}

}
