import {Request} from './request';

export namespace Api {
	/**
	 * Деталь машины (стекло)
	 */
	export interface IDetail {
		readonly id: number
		readonly caption: string,
		readonly size: number,
		readonly cameraPosition: string,
		readonly meshName: string,
		readonly serviceIDs: number[]
	}

	/**
	 * Виды работ
	 */
	export interface IService {
		readonly id: number,
		readonly caption: string,
		readonly description: string
	}

	/**
	 * Матерьялы для обклейки
	 */
	export interface IMaterial {
		readonly id: number,
		readonly caption: string,
		readonly producerId: number,
		readonly colorId: number | null,
		readonly opacityId: number | null,
		readonly thicknessId: number | null,
		readonly price: number,
		readonly serviceId: number
	}

	/**
	 * Цвета
	 */
	export interface IColor {
		readonly id: number,
		readonly caption: string,
		readonly rgb: string;
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
		readonly id: number
		readonly caption: string
	}

	/**
	 * Прозрачность
	 */
	export interface IOpacity {
		readonly id: number,
		readonly caption: string
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