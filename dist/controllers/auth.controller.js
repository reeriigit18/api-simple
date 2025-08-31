"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../prisma/prisma"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'Email and password required' });
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                // role: role || 'USER',
            },
        });
        res.status(201).json({ message: 'User registered', user: { id: user.id, email: user.email } });
    }
    catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});
exports.register = register;
const login = (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ message: 'Logged in', user: req.user });
    }
    res.status(401).json({ error: 'Unauthorized' });
};
exports.login = login;
const logout = (req, res) => {
    req.logout(err => {
        if (err)
            return res.status(500).json({ error: 'Logout failed' });
        res.json({ message: 'Logged out' });
    });
};
exports.logout = logout;
const getCurrentUser = (req, res) => {
    if (!req.isAuthenticated())
        return res.status(401).json({ error: 'Unauthorized' });
    res.json(req.user);
};
exports.getCurrentUser = getCurrentUser;
