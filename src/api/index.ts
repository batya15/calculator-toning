import {Request} from './request';

export namespace Api {
	/**
	 * Деталь машины (стекло)
	 */
	export interface IDetail {
		id: number
		caption: string,
		size: number,
		cameraPosition: string,
		meshName: string,
		serviceIDs: string[]
	}

	/**
	 * Виды работ
	 */
	export interface IService {
		id: number,
		caption: string,
		description: string
	}

	/**
	 * Матерьялы для обклейки
	 */
	export interface IMaterial {
		readonly id: number,
		readonly caption: string,
		readonly producerId: number,
		readonly colorId: string | null,
		readonly opacityId: string | null,
		readonly thicknessId: string | null,
		readonly price: number,
		readonly serviceId: string
	}

	/**
	 * Цвета
	 */
	export interface IColor {
		id: number,
		caption: string,
		rgb: string;
	}

	/**
	 * Производитель
	 */
	export interface IProducer {
		readonly id: number
		readonly caption: string
	}

	/**
	 * Толщина пленки
	 */
	export interface IThickness {
		id: number
		caption: string
	}

	/**
	 * Прозрачность
	 */
	export interface IOpacity {
		id: number,
		caption: string
	}

}

export default {
	details: new Request<Api.IDetail[]>('details'),
	services: new Request<Api.IService[]>('services'),
	materials: new Request<Api.IMaterial[]>('materials'),
	producers: new Request<Api.IProducer[]>('producers'),
	colors: new Request<Api.IColor[]>('colors'),
	thickness: new Request<Api.IThickness[]>('thickness'),
	opacity: new Request<Api.IOpacity[]>('opacity'),
}