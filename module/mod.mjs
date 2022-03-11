export * from "./app.mjs";
export * from "./color.mjs";
export * from "./util.mjs";
export * from "./draw/mod.mjs"
export * from "./size.mjs";

import { AppBuilder } from "./app.mjs";

/**
 * Begin building the @type {App}.
 * @returns {AppBuilder} - the app builder
 */
export const app = () => {
    return new AppBuilder();
};