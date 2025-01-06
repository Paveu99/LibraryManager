import Router from "express";
import { UserRecord } from "../records/user.record";
import { compare } from "bcrypt";
import { UserDto } from "../types";
import { log } from "console";
import { LogRecord } from "../records/logs.record";

export const userRouter = Router()

userRouter
    .get('/', async (req, res) => {
        console.log('jellpo');
        const { name } = req.body;
        const user = await UserRecord.listAll();
        // const response = 
        // const users = user.map((el) => el.)
        await LogRecord.add("USER_VIEW", "User has viewed the users", "5aef7b1b-cc61-11ef-add6-e88088498afd")
        res.json({ res: user[0].first_name })
        res.end()
    })

    .post('/login', async (req, res) => {
        console.log(req.body);

        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: 'Email and password are required.' });
            }

            const user = await UserRecord.getOneByEmail(email);
            if (!user) {
                res.status(401).json({ error: 'Invalid email or password.' });
            }

            const isPasswordValid = await compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ error: 'Invalid email or password.' });
            }

            res.status(200).json({ user, message: 'Login successful.' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error.' });
        }
    })

    .post('/reg', async (req, res) => {
        try {
            const newUser = new UserRecord(req.body as UserDto);

            const existingUser = await UserRecord.getOneByEmail(newUser.email);
            if (existingUser) {
                res.status(409).json({ error: `Email ${newUser.email} is already registered.` });
            }

            await newUser.insert();
            res.status(201).json({ message: `User ${newUser.first_name} ${newUser.last_name} registered successfully.` });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error.' });
        }
    })

    .delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const user = await UserRecord.getOneById(id);

            if (!user) {
                res.status(404).json({ error: 'User not found.' });
            }

            await user.delete();
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    });
