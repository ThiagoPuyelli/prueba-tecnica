"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    const caracters = "abcdefghijklmnopqrstuvwxyz1234567890";
    var code = "";
    for (let i = 0; i <= 10; i++)
        code += caracters[Math.round((Math.random() * (caracters.length - 1)))];
    return code;
};
