import axios from 'axios';

export class Request<T> {
	static cacheJSON: any = null;
	static loading: boolean = false;
	static cbs: ((err?: any) => void)[] = [];
	constructor(private url: string) {
	}

	get(): Promise<T> {
		return new Promise((resolve, reject) => {
			if (Request.cacheJSON !== null) {
				resolve(Request.cacheJSON[this.url])
			} else {
				if (!Request.loading) {
					Request.loading = true;
					axios.get('assets/api.json')
						.then(response => {
							Request.cacheJSON = response.data;
							resolve(Request.cacheJSON[this.url]);
							Request.cbs.forEach(cb => cb());
						})
						.catch(err => {
							Request.cacheJSON = {};
							reject(err);
							Request.cbs.forEach(cb => cb(err));
						})
				} else {
					Request.cbs.push((err?: any): void => {
						if (!err) {
							resolve(Request.cacheJSON[this.url]);
						} else {
							reject(err);
						}
					})
				}
			}
		});


	}
}