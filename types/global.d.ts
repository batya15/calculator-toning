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

// for redux devtools extension
declare interface Window {
	devToolsExtension?(): (args?: any) => any;
}
