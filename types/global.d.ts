/** Global definitions for developement **/

// for style loader
declare module '*.css' {
	const styles: any;
	export = styles;
}

// for style loader
declare module '*.pcss' {
	const styles: any;
	export = styles;
}

declare interface IConfigApp {
	assets: string;
}

// for redux devtools extension
declare interface Window {
	__config : IConfigApp
	devToolsExtension?(): (args?: any) => any;
}
