import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import {prisma} from '@/lib/prisma';
import {loginSchema} from '@/lib/validation/auth';

export const {handlers, auth, signIn, signOut} = NextAuth({
    session: {strategy: 'jwt'},
    pages: {signIn: '/admin/login'},
    providers: [
        Credentials({
            credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'},
            },
            authorize: async (credentials) => {
                const parsed = loginSchema.safeParse(credentials);
                if (!parsed.success) return null;

                const admin = await prisma.adminUser.findUnique({where: {email: parsed.data.email}});
                if (!admin) return null;

                const passwordMatches = await bcrypt.compare(parsed.data.password, admin.passwordHash);
                if (!passwordMatches) return null;

                return {id: admin.id, email: admin.email, name: admin.name ?? undefined};
            },
        }),
    ],
    callbacks: {
        jwt: ({token, user}) => {
            if (user) token.id = user.id;
            return token;
        },
        session: ({session, token}) => {
            if (session.user) session.user.id = token.id as string;
            return session;
        },
    },
});
