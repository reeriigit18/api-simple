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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.userCreate = void 0;
const prisma_1 = __importDefault(require("../prisma/prisma"));
const userCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        yield prisma_1.default.user.create({
            data: {
                email: email,
                password
            }
        });
        return res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Failed to create user" });
    }
});
exports.userCreate = userCreate;
//selecting all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany();
        return res.status(200).json({ data: users, message: "Users fetched successfully" });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Failed to fetch users" });
    }
});
exports.getAllUsers = getAllUsers;
//selecting a user by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { id: Number(id) },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Failed to fetch user" });
    }
});
exports.getUserById = getUserById;
//update a user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
        const updatedUser = yield prisma_1.default.user.update({
            where: { id: Number(id) },
            data: { email, password },
        });
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Failed to update user" });
    }
});
exports.updateUser = updateUser;
//deleting a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma_1.default.user.delete({
            where: { id: Number(id) },
        });
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Failed to delete user" });
    }
});
exports.deleteUser = deleteUser;
