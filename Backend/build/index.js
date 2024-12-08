"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//creamos la app a traves del paquete express
// y llamamos a su constructor
const app = (0, express_1.default)();
//todo lo que se regresa al usuario es tipo JSON
app.use(express_1.default.json());
//puesto para escuchar la peticion del frontend
const puerto = 3001;
//encendemos el servidor
app.listen(puerto, () => {
    console.log(`Servidor en ejecucion y escuchando en el puerto ${puerto}`);
});
